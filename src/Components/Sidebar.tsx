import { Link } from 'react-router-dom';
import '../Styles/Sidebar.css'
import sidebarElements from '../assets/sidebar'
import SidebarElement from './SidebarElement'
import useWindowDimensions from '../assets/windowSizeHook';
import { useEffect } from 'react';

type SidebarProps = {
  onNavigateHome?: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

function Sidebar({ onNavigateHome, isMenuOpen, setIsMenuOpen }: SidebarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  // Close menu when route changes or on mobile resize
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile, setIsMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

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

      {/* Mobile hamburger menu button moved to Header */}

      {/* Overlay for mobile */}
      {isMobile && (
        <div
          className={`sidebar-overlay ${isMenuOpen ? 'visible' : ''}`}
          onClick={closeMenu}
        />
      )}

    <aside className={`sidebar grainy-bg-blur ${isMenuOpen ? 'mobile-open' : ''}`}>
      {sidebarElements.map( ({text, icon, link, linkElement}, index) => {
        if (index === 0) {
          return (
            <button
              className='sidebar-link'
              key={index}
              onClick={() => {
                onNavigateHome?.();
                if (isMobile) closeMenu();
              }}
            >
              <SidebarElement text={text} icon={icon} key={index}></SidebarElement>
            </button>
          );
        }
        return linkElement ?
          <Link
            to={link}
            className='sidebar-link'
            key={index}
            onClick={() => {
              if (isMobile) closeMenu();
            }}
          >
            <SidebarElement text={text} icon={icon} key={index}></SidebarElement>
          </Link>
          :
          <a href={link} target="_blank" rel="noreferrer" className='sidebar-link' key={index}
             onClick={isMobile ? closeMenu : undefined}>
            <SidebarElement text={text} icon={icon} key={index}></SidebarElement>
          </a>
      })}
    </aside>
    </>
  )
}

export default Sidebar;
