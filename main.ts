// Six Words, One Story — make.fun entry
//
// One complete story, told in exactly six words:
//
//   "He planted goodbye. Spring sent flowers."
//
// The story in brief: a man plants a goodbye — a parting, a grave,
// a letter never sent — and the season answers with flowers. The first
// sentence buries an ending; the second turns it into a beginning. Who
// left, and why, and whether he is still standing at the fence waiting,
// is left for the reader. Every word earns its place: "planted" makes
// the goodbye a seed, "Spring" is both the season and the verb of return,
// and "flowers" is the reply no one asked for.
//
// This program writes that single line to /output/entry.txt, the file
// the gate checks: UTF-8 text, 1 to 60 characters, not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// The entry. Exactly six words, forty-one characters.
const STORY = "He planted goodbye. Spring sent flowers.";

function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).length;
}

function validateStory(text: string): void {
  const wordCount = countWords(text);
  if (wordCount !== 6) {
    throw new Error(`story must be exactly 6 words, got ${wordCount}`);
  }
  if (text.length < 1 || text.length > 60) {
    throw new Error(`story must be 1-60 characters, got ${text.length}`);
  }
  if (text.trim() === "") {
    throw new Error("story must not be only whitespace");
  }
}

function main(): void {
  validateStory(STORY);

  const outPath = resolve("/output/entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, STORY, { encoding: "utf8" });

  console.log(`wrote ${countWords(STORY)} words, ${STORY.length} chars to ${outPath}`);
  console.log(STORY);
}

main();
