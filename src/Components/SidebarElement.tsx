import Icon from "./Icon";
import '../Styles/SidebarElement.css'


type sidebarElementProps = {
  text: string;
  icon: string;
}

function SidebarElement({ text, icon}: sidebarElementProps) {
  return (
    <nav className="sidebar-element">
      <Icon name={icon} className='sidebar-element-icon' filled={true}></Icon>
      <p>{text}</p>
    </nav>
  )
}   

export default SidebarElement;