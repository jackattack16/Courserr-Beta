import '../Styles/Sidebar.css'
import sidebarElements from '../assets/sidebar'
import SidebarElement from './SidebarElement'

function Sidebar() {
  
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <defs>
        <filter id="grain">
  <feTurbulence
    type="fractalNoise"
    baseFrequency="0.65"
    numOctaves="2"
    stitchTiles="stitch"
    result="noise"
  />
  <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise"/>
  <feComponentTransfer in="grayNoise" result="fadedNoise">
    <feFuncA type="linear" slope="0.15"/>
  </feComponentTransfer>
  <feBlend in="SourceGraphic" in2="fadedNoise" mode="soft-light"/>
  <feComposite in2="SourceGraphic" operator="in"/>
</filter>
        </defs>
      </svg>
    <aside className='sidebar grainy-bg-blur'>
      {sidebarElements.map( ({text, icon}, index) => (
        <SidebarElement text={text} icon={icon} key={index}></SidebarElement>
      ))}
    </aside>
    </>
  )
}

export default Sidebar;