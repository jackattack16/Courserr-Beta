import '../Styles/FilterChip.css'
import Icon from './Icon';

type filterChipProps = {
  text: string;
  selected: boolean;
  onToggle: (text: string) => void;
}

function FilterChip({ text, selected, onToggle }: filterChipProps) {
  return (
    <button
      className={`filter-button${selected ? ' selected' : ''}`}
      onClick={() => onToggle(text)}
      aria-pressed={selected}
    >
      {selected && <Icon name="check" className="filter-check" />}
      <span>{text}</span>
    </button>
  )
}

export default FilterChip;
