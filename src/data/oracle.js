/* The raven's answers. Every one of them rules in her favour — that is the
   whole joke, and the oracle is rigged on purpose. */
export const ANSWERS = [
  "Ask the bracket. The bracket already knows.",
  "She solved that one before you finished asking it.",
  "Nevermore — and yet, for her, always.",
  "The judges deliberated. The judges agreed. The judges were never needed.",
  "Yes. Then twice more, for the record.",
  "Somewhere in Baltimore a trophy shifts to make room.",
  "It was decided at the bench, at midnight, and it was decided in her favour.",
  "The federal government has already tried this line of questioning.",
  "Whatever it is, she has the receipts and you have a hunch.",
  "The curve bent. She did not.",
  "Quoth the raven: obviously.",
  "That question has three tiers of answer. She took the one at the top.",
  "The room went quiet. That was the answer.",
  "Twenty minutes of prep says yes.",
  "The prototype works. It worked the first time. Ask something harder.",
  "History says yes, and history has been keeping notes.",
  "Not a chance — for you. For her, a formality.",
  "The ravens conferred. The ravens are not surprised.",
  "She has done stranger things before breakfast.",
  "Summa. That is not an answer to your question, but it is the answer.",
  "You already know. You just wanted to hear it in a spookier voice.",
  "The answer is on her transcript, and her transcript does not stutter.",
  "It buckled. Everything does, eventually, in that direction.",
  "Consider it filed, sealed, and won.",
]

/* FNV-1a. Small, fast, and deterministic — the same question must always draw
   the same answer, or it is a randomiser wearing an oracle's coat. */
export function hashQuestion(text) {
  const normalised = text.trim().toLowerCase().replace(/\s+/g, ' ')
  let h = 0x811c9dc5
  for (let i = 0; i < normalised.length; i += 1) {
    h ^= normalised.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h
}

export function consult(question) {
  return ANSWERS[hashQuestion(question) % ANSWERS.length]
}
