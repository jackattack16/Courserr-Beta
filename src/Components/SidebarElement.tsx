import Icon from "./Icon";
import '../Styles/SidebarElement.css'


type sidebarElementProps = {
  text: string;
  icon: string;
}

function SidebarElement({ text, icon }: sidebarElementProps) {
  return (
    <>
    <nav className="sidebar-element">
      <Icon name={icon} className='sidebar-element-icon'></Icon>
      <a>{text}</a>
    </nav>
    </>
  )
}   

export default SidebarElement;