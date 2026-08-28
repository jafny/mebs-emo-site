/* Full-bleed band of giant outlined type sliding past. Pure decoration —
   the loudest thing on the page and deliberately unreadable as content. */
export default function HypeBand({ text = 'ALL HAIL MEBS', reverse = false }) {
  const runs = Array.from({ length: 4 }, (_, i) => i)
  return (
    <div className="hypeband" aria-hidden="true">
      <div className={`hypeband__track ${reverse ? 'hypeband__track--rev' : ''}`}>
        {runs.map((i) => (
          <span key={i} className="hypeband__word">
            {text}
            <b>✷</b>
          </span>
        ))}
      </div>
    </div>
  )
}
