import '../Styles/List-Elements.css'

type listElementProps = {
  type?: string;
  text: string;
}
function ListElement({ type, text }: listElementProps) {

  return (
    // Todo: make this into a div with proper text format
    <li>
      <button className={`list-element ${type}`}>
        <p>{text}</p>
      </button>
    </li>
  )
}

export default ListElement;