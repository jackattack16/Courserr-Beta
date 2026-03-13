import '../Styles/List-Elements.css'
import Icon from './Icon';

type listElementProps = {
  type?: string;
  text: string;
}
function ListElement({ type, text }: listElementProps) {

  return (
    <li>
      <button className={`list-element ${type}`}>
        {type ? <Icon name="error"/> : ""}
        <p>{text}</p>
        {type ? <Icon name="error"/> : ""}
      </button>
    </li>
  )
}

export default ListElement;