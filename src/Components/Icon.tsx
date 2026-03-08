
// Thanks Genini
export default function Icon({ name = "", filled = false, className = "" }) {
  return (
    <span 
      className={`material-symbols-rounded ${className}`}
      style={{ 
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
      }}
    >
      {name}
    </span>
  );
}