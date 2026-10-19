export const hasFiveImageBatch = text => /\bbatch(?:es)?\s+of\s+(?:exactly\s+)?(?:5|five)\b|\b(?:5|five)[- ]image batch(?:es)?\b|\bgroups of (?:5|five)\b/iu.test(String(text));
