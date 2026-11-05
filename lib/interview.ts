// ponytail: a few word and length rules standing in for the real scoring model.
// Good enough to show the shape of the feedback. Replace with UpadyAI's scorer when wired up.

export interface Scores { clarity: number; depth: number; confidence: number }

const HEDGES = /\b(maybe|i guess|not sure|kind of|sort of|probably|i think|um+|uh+)\b/gi;
const EVIDENCE = /\b(because|for example|for instance|so that|result|resulted|improved|reduced|increased|learned|tradeoff|trade-off)\b|\d/gi;

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function scoreAnswer(text: string): Scores {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { clarity: 0, depth: 0, confidence: 0 };

  const sentences = Math.max(1, text.split(/[.!?]+/).filter((s) => s.trim()).length);
  const perSentence = words.length / sentences;
  // Clarity peaks when sentences run 8 to 22 words and falls off either side.
  const clarity = clamp(100 - Math.abs(perSentence - 15) * 5 - (words.length < 15 ? (15 - words.length) * 3 : 0));
  const depth = clamp(Math.min(words.length, 80) * 0.6 + (text.match(EVIDENCE)?.length ?? 0) * 12);
  const confidence = clamp(100 - (text.match(HEDGES)?.length ?? 0) * 22 - (words.length < 8 ? 25 : 0));
  return { clarity, depth, confidence };
}

export const coach = (s: Scores): string => {
  const lowest = (Object.entries(s) as [keyof Scores, number][]).sort((a, b) => a[1] - b[1])[0];
  if (lowest[1] >= 75) return "Strong answer. Keep this structure for the real interview.";
  if (lowest[0] === "clarity") return "Break this into shorter sentences, and lead with the answer.";
  if (lowest[0] === "depth") return "Add one concrete example with a result or a number.";
  return "Cut hedging words like 'maybe' and 'I think', and state your answer plainly.";
};

export const rounds = {
  hr: {
    label: "HR",
    questions: [
      "Tell me about yourself and why you want this role.",
      "Describe a time you disagreed with a teammate. What happened?",
      "Where do you want to be in three years?",
    ],
  },
  technical: {
    label: "Technical",
    questions: [
      "Explain the difference between a process and a thread.",
      "How would you design a rate limiter for an API?",
      "What happens when you type a URL into a browser?",
    ],
  },
  dsa: {
    label: "DSA",
    questions: [
      "How would you find two numbers in an array that add up to a target?",
      "When would you use a hash map instead of sorting?",
      "How do you detect a cycle in a linked list?",
    ],
  },
} as const;
export type RoundKey = keyof typeof rounds;
