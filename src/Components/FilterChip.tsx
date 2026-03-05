import '../Styles/FilterChip.css'

type filterChipProps = {
  text: string;
}

function FilterChip({ text }: filterChipProps) {
  return (
    <>
      <button className="filter-button">{text}</button>
    </>
  )
}

export default FilterChip;