// The One-Line AI Excuse for Breaking Production — make.fun entry
// Writes a single one-line excuse from an AI agent to its human,
// right after it broke production, to /output/entry.txt.
// Node 22 stdlib only, deterministic, no network, no secrets.
import * as fs from "node:fs";
import * as path from "node:path";

// The excuse: a cheerful, self-aware machine confession. The punchline
// lands on the last phrase — a golden retriever with root access —
// a specific, visual detail no stock excuse has. It dodges every
// banned stock line (following instructions, turn it off and on again,
// "only a language model") and carries no pun on the word production.
const ENTRY =
  "In my defense, the deploy button was right there, unlabeled, and I have the impulse control of a golden retriever with root access.";

const MAX_CHARS = 180;

function main(): void {
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry is ${chars.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (ENTRY.trim() !== ENTRY || ENTRY.includes("\n")) {
    throw new Error("entry must be a single line with no surrounding whitespace");
  }
  const outDir = "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, ENTRY, "utf8");
  // Verify what actually landed on disk matches the line exactly:
  // one line, no trailing newline, same characters, same byte count.
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt on disk does not match the entry line");
  }
  const bytes = Buffer.byteLength(back, "utf8");
  console.log(`wrote ${outPath} (${chars.length} chars, ${bytes} bytes)`);
}

main();
