/* Five questions, but deliberately not a quiz: there is no score on screen,
   no green tick, no red cross. Each answer just draws a line from the raven. */
export const QUESTIONS = [
  {
    id: 'honors',
    prompt: 'What honours did she leave Hopkins with?',
    options: [
      { label: 'Cum laude', right: false, reply: 'Cum laude. You are two whole tiers short and the raven is staring at you.' },
      { label: 'Magna cum laude', right: false, reply: 'Close. Still not the top. She does not deal in close.' },
      { label: 'Summa cum laude', right: true, reply: 'Summa. The highest the university hands out. You may remain standing.' },
    ],
  },
  {
    id: 'city',
    prompt: 'Which city has been talking about her for years?',
    options: [
      { label: 'Boston', right: false, reply: 'Boston has its own problems. This is a Baltimore story.' },
      { label: 'Baltimore', right: true, reply: 'Baltimore. Where the ravens keep score, and the score is not close.' },
      { label: 'Philadelphia', right: false, reply: 'Wrong bird, wrong bridge, wrong city.' },
    ],
  },
  {
    id: 'deca',
    prompt: 'How long does she need to dismantle a case?',
    options: [
      { label: 'A week of prep', right: false, reply: 'A week? She would be bored by Tuesday and win anyway.' },
      { label: 'Twenty minutes', right: true, reply: 'Twenty minutes. Clock starts, judges lean in, nobody remembers who else presented.' },
      { label: 'A full semester', right: false, reply: 'A semester is how long the other teams needed. It did not help them.' },
    ],
  },
  {
    id: 'irs',
    prompt: 'She once went three rounds with the federal government. How did that end?',
    options: [
      { label: 'She settled quietly', right: false, reply: 'Settled? You have badly misjudged the person we are discussing.' },
      { label: 'She won', right: true, reply: 'She won. Read the code, built the case, and the government blinked first.' },
      { label: 'She is still fighting', right: false, reply: 'It was over years ago. The government has moved on. She has not needed to.' },
    ],
  },
  {
    id: 'field',
    prompt: 'What does she actually build?',
    options: [
      { label: 'Biomedical devices', right: true, reply: 'Biomedical. Devices that integrate with human biology and are not allowed to fail.' },
      { label: 'Enterprise software', right: false, reply: 'Have you seen the software bar on this page? Try again.' },
      { label: 'Bridges', right: false, reply: 'Structurally sound guess. Entirely the wrong discipline.' },
    ],
  },
]

export const STANDINGS = [
  {
    id: 'peasant',
    min: 0,
    title: 'Peasant',
    line: 'You have heard the name. That is genuinely all you have. Go back and read it properly.',
  },
  {
    id: 'acolyte',
    min: 3,
    title: 'Acolyte',
    line: 'You know enough to be dangerous and not enough to be useful. The raven permits you to stay.',
  },
  {
    id: 'sworn',
    min: 5,
    title: 'Raven-Sworn',
    line: 'You know the record cold. Go forth and tell them what you have seen.',
  },
]

export function standingFor(correct) {
  return [...STANDINGS].reverse().find((s) => correct >= s.min) ?? STANDINGS[0]
}

export function standingById(id) {
  return STANDINGS.find((s) => s.id === id) ?? null
}
