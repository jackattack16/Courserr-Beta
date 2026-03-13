
// Thanks Genini
export default function Icon({ name = "", filled = false, className = "" }) {
  return (
    <span 
      className={`material-symbols-rounded ${className}`}
      style={{ 
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`, userSelect: "none", transition: 'font-variation-settings 0.5s var(--spring-easing)'
      }}
    >
      {name}
    </span>
  );
}