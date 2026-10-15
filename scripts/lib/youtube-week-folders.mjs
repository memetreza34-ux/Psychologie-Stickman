import fs from 'node:fs';
import path from 'node:path';

// Calendar weeks use ISO-8601: Monday through Sunday, Europe/Germany civil dates.
const pad = (n) => String(n).padStart(2, '0');
const short = (d) => pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1);
export const projectNamePattern = /^\d{2}\.\d{2}\.\d{4}-.+$/u;
export const weekFolderPattern = /^\d{4}-KW\d{2}_\d{2}\.\d{2}-\d{2}\.\d{2}$/u;

export const weekForDate = (dateString) => {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/u.exec(String(dateString));
  if (!m) throw new Error('Expected German date DD.MM.YYYY: ' + dateString);
  const day = Number(m[1]), month = Number(m[2]), year = Number(m[3]);
  const d = new Date(Date.UTC(year, month - 1, day));
  if (d.getUTCFullYear() !== year || d.getUTCMonth() !== month - 1 || d.getUTCDate() !== day) {
    throw new Error('Invalid calendar date: ' + dateString);
  }
  const monday = new Date(d);
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(sunday.getUTCDate() + 6);
  const thursday = new Date(monday);
  thursday.setUTCDate(thursday.getUTCDate() + 3);
  const isoYear = thursday.getUTCFullYear();
  const jan4 = new Date(Date.UTC(isoYear, 0, 4));
  jan4.setUTCDate(jan4.getUTCDate() - (jan4.getUTCDay() + 6) % 7);
  const week = Math.round((monday.getTime() - jan4.getTime()) / (7 * 86400000)) + 1;
  const folder = isoYear + '-KW' + pad(week) + '_' + short(monday) + '-' + short(sunday);
  const full = (v) => short(v) + '.' + v.getUTCFullYear();
  return {folder, isoYear, week, monday: full(monday), sunday: full(sunday)};
};

export const weekForProjectName = (name) => {
  if (!projectNamePattern.test(name)) throw new Error('Expected DD.MM.YYYY-topic: ' + name);
  return weekForDate(name.slice(0, 10));
};

export const projectRelativePath = (name) => {
  const week = weekForProjectName(name);
  return 'youtube/' + week.folder + '/' + name;
};

export const listYouTubeProjects = (repoRoot = path.resolve('.')) => {
  const youtubeRoot = path.join(repoRoot, 'youtube');
  if (!fs.existsSync(youtubeRoot)) return [];
  const result = [];
  for (const group of fs.readdirSync(youtubeRoot, {withFileTypes: true})) {
    if (!group.isDirectory() || group.name === '00-vorlage') continue;
    if (projectNamePattern.test(group.name)) {
      throw new Error('Unsorted project outside a calendar week: youtube/' + group.name);
    }
    if (!weekFolderPattern.test(group.name)) {
      throw new Error('Unexpected folder under youtube/: ' + group.name);
    }
    for (const project of fs.readdirSync(path.join(youtubeRoot, group.name), {withFileTypes: true})) {
      if (!project.isDirectory()) continue;
      const expected = weekForProjectName(project.name).folder;
      if (expected !== group.name) {
        throw new Error('Project in wrong ISO week: youtube/' + group.name + '/' + project.name + ' (expected ' + expected + ')');
      }
      result.push('youtube/' + group.name + '/' + project.name);
    }
  }
  return result.sort();
};
