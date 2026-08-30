export default function Marquee({ items, reverse = false }) {
  const row = [...items, ...items]

  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee__track ${reverse ? 'marquee__track--rev' : ''}`}>
        {row.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}
