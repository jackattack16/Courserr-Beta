import '../Styles/List-Elements.css'

type listElementProps = {
  type?: string;
  text: string;
}
function ListElement({ type, text }: listElementProps) {

  return (
    <li>
      <button className={`list-element ${type}`}>
        <p>{text}</p>
      </button>
    </li>
  )
}

export default ListElement;