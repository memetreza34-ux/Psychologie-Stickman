#!/usr/bin/env node

// Stil-Check für Sprecherskripte (SKRIPT_METHODE_V2). Misst, was Zuschauer hören: Rhythmus, Absicherungs-Wörter,
// Fragen, Wiederholungen, Hook-Muster und Länge. Warnungen sind Hinweise; FAIL nur bei klaren Problemen.
// Nutzung: npm run qa:script-style -- <pfad/zu/script.txt> [--minuten 6.5]

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('--') && !/^\d/.test(arg));
const minutesIndex = args.indexOf('--minuten');
const minutes = minutesIndex >= 0 ? Number(args[minutesIndex + 1]) : 6.5;
if (!file) {
  console.error('Nutzung: npm run qa:script-style -- <script.txt> [--minuten 6.5]');
  process.exit(1);
}

const text = fs.readFileSync(path.resolve(file), 'utf8').replace(/\r/g, '');
const words = text.split(/\s+/).filter(Boolean);
const sentences = text.split(/(?<=[.!?…])\s+|\n+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length > 0 && /\w/.test(s));
const lengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
const sd = Math.sqrt(lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / lengths.length);

const HEDGES = ['vielleicht', 'möglicherweise', 'eventuell', 'unter bestimmten', 'zumindest', 'eher', 'gewissermaßen', 'plausibel', 'keine garantie', 'nicht unbedingt', 'kann sein', 'könnte'];
const lower = text.toLowerCase();
const countPhrase = (phrase) => (lower.match(new RegExp(`(?<![\\wäöüß])${phrase}(?![\\wäöüß])`, 'g')) ?? []).length;
const hedges = HEDGES.map((h) => [h, countPhrase(h)]).filter(([, n]) => n > 0);
const hedgeTotal = hedges.reduce((a, [, n]) => a + n, 0);

const CLICHES = ['stell dir vor', 'das interessante ist', 'und jetzt wird es', 'aber hier kommt', 'genau hier', 'plötzlich', 'unser gehirn', 'tatsächlich'];
const cliches = CLICHES.map((c) => [c, countPhrase(c)]).filter(([, n]) => n > 1);

const questions = (text.match(/\?/g) ?? []).length;
const youWords = (lower.match(/(?<![\wäöüß])(du|dein\w*|dich|dir)(?![\wäöüß])/g) ?? []).length;
const firstSentence = sentences[0] ?? '';
const first40 = words.slice(0, 40).join(' ').toLowerCase();

// Monotonie: Wie viele Sätze in Folge haben fast dieselbe Länge (±3 Wörter)?
let longestRun = 1;
let run = 1;
for (let i = 1; i < lengths.length; i += 1) {
  run = Math.abs(lengths[i] - lengths[i - 1]) <= Math.max(2, 0.2 * Math.max(lengths[i], lengths[i - 1])) ? run + 1 : 1;
  longestRun = Math.max(longestRun, run);
}

// Offene Schleifen ("gleich", "später", "am Ende") halten Zuschauer über Abschnitte hinweg.
const openLoops = (lower.match(/(?<![\wäöüß])(gleich|später|am ende|dazu kommen wir|bleib dran|gleich zeige ich)(?![\wäöüß])/g) ?? []).length;

const wpm = 150;
const targetWords = Math.round(minutes * wpm);
const results = [];
const add = (level, message) => results.push({level, message});

if (words.length > targetWords * 1.12) add('WARN', `${words.length} Wörter ≈ ${(words.length / wpm).toFixed(1)} min bei ${wpm} WpM – Ziel ${minutes} min ≈ ${targetWords} Wörter. Kürzen: jede Zeile muss Neues bringen.`);
if (words.length < targetWords * 0.75) add('WARN', `Nur ${words.length} Wörter für ${minutes} min.`);
// Relative Streuung (Variationskoeffizient), damit kurze und lange Skriptstile fair verglichen werden.
const cv = sd / mean;
if (cv < 0.45) add('WARN', `Satzrhythmus monoton (Variationskoeffizient ${cv.toFixed(2)}, Ziel ≥ 0.45). Mehr ganz kurze Sätze (2–5 Wörter) als Schlag setzen.`);
if (longestRun >= 8) add('WARN', `${longestRun} Sätze in Folge mit fast gleicher Länge.`);
const hedgeRate = (hedgeTotal / words.length) * 1000;
if (hedgeRate > 12) add('FAIL', `${hedgeTotal} Absicherungswörter (${hedgeRate.toFixed(1)} pro 1000 Wörter, max 12): ${hedges.map(([h, n]) => `${h}×${n}`).join(', ')}. Einschränkungen EINMAL klar in einem eigenen Abschnitt sagen statt überall verteilen.`);
else if (hedgeRate > 7) add('WARN', `${hedgeTotal} Absicherungswörter (${hedgeRate.toFixed(1)}/1000): ${hedges.map(([h, n]) => `${h}×${n}`).join(', ')}.`);
const questionRate = (questions / words.length) * 1000;
if (questionRate < 6) add('WARN', `Nur ${questions} Fragen (${questionRate.toFixed(1)}/1000 Wörter, Ziel ≥ 6). Fragen sind Mini-Hooks.`);
if (openLoops < 2) add('WARN', `Nur ${openLoops} offene Schleifen ("gleich", "später", "am Ende"). Mindestens 2–3 Versprechen setzen, die später eingelöst werden.`);
for (const [phrase, n] of cliches) add('WARN', `Floskel "${phrase}" ${n}× – wirkt formelhaft.`);
if (/^warum\b/i.test(firstSentence) && /plötzlich/i.test(firstSentence)) add('WARN', 'Hook nutzt das Kanal-Standardmuster "Warum … plötzlich …". Anderen Hook-Typ testen (siehe SKRIPT_METHODE_V2).');
if (firstSentence.split(/\s+/).length > 16) add('WARN', `Erster Satz hat ${firstSentence.split(/\s+/).length} Wörter. Hook-Satz ≤ 14 Wörter.`);
if (!/\d|prozent|hälfte|doppelt|(?<![\wäöüß])(zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn|zwanzig|hundert|tausend)/.test(lower)) add('WARN', 'Keine einzige Zahl im Skript. Konkrete Zahlen machen Studien greifbar.');
if (!/(du|dein|dir|dich)/.test(first40)) add('WARN', 'Die ersten 40 Wörter sprechen den Zuschauer nicht direkt an.');

console.log(`SKRIPT-STIL: ${path.relative('.', file)}`);
console.log(`  Wörter ${words.length} (≈${(words.length / wpm).toFixed(1)} min) · Sätze ${sentences.length} · Ø ${mean.toFixed(1)} Wörter · Streuung ${(sd / mean).toFixed(2)} · kurze Sätze (≤5) ${lengths.filter((l) => l <= 5).length}`);
console.log(`  Fragen ${questions} · du/dein ${youWords} · Absicherungen ${hedgeTotal} · offene Schleifen ${openLoops}`);
for (const r of results) console.log(`  ${r.level}: ${r.message}`);
const failed = results.some((r) => r.level === 'FAIL');
console.log(failed ? 'ERGEBNIS: FAIL' : results.length ? 'ERGEBNIS: OK mit Hinweisen' : 'ERGEBNIS: OK');
process.exit(failed ? 1 : 0);
