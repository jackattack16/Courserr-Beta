import type { Dispatch, SetStateAction } from 'react';
import "../Styles/Header.css";
import FilterDialouge from "./Dialouge";
import Searchbar from "./Searchbar";
import useWindowDimensions from '../assets/windowSizeHook';
import useScrollDirection from '../assets/useScrollDirection';
import type { FilterState } from '../assets/filterTypes';
import Icon from './Icon';
import { useTheme } from '../assets/ThemeContext';

import { useRef, useState } from 'react';

type headerProps = {
  updateSearchQuery: (query: string) => void;
  clearTrigger?: number;
  activeFilters: FilterState;
  setActiveFilters: Dispatch<SetStateAction<FilterState>>;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onNavigateHome: () => void;
}


function Header( {updateSearchQuery, clearTrigger, activeFilters, setActiveFilters, isMenuOpen, toggleMenu, onNavigateHome}: headerProps) {
  const { width } = useWindowDimensions();
  const { scrollDirection, isScrolled } = useScrollDirection();
  const isMobile = width <= 768;
  const hideHeader = isMobile && isScrolled && scrollDirection === 'down';
  const { isDarkMode, toggleTheme } = useTheme();

  const [changingState, setChangingState ] = useState(false);

  const modeToggleRef = useRef<HTMLButtonElement | null>(null);
  const lightMode = useRef<HTMLSpanElement | null>(null);
  const darkMode = useRef<HTMLSpanElement | null>(null);
  const modeIconRef = useRef<HTMLSpanElement | null>(null);

    const toggleMode = () => {
      if (!changingState) {
        setChangingState(true);
        
        // Toggle theme immediately so CSS transitions start now
        toggleTheme();

        // Rotate the inner icon wrapper
        if (modeIconRef.current) {
          modeIconRef.current.style.transform = "rotate(360deg)";
          modeIconRef.current.style.transition = "transform 1s ease";
        }

      if (lightMode.current && darkMode.current) {
        if (isDarkMode) {
          lightMode.current.style.opacity = "1";
          darkMode.current.style.opacity = "0";
        } else {
          lightMode.current.style.opacity = "0";
          darkMode.current.style.opacity = "1";
        }
      }
      setTimeout(() => { 
        if (modeIconRef.current) {
          modeIconRef.current.style.transition = "";
          modeIconRef.current.style.transform = "";
          setChangingState(false);
        }
      }, 1000);  
    }
  };


  
  return (
    <>
      <header className={`grainy-bg-blur${hideHeader ? ' header-hidden' : ''}`}>

        {isMobile ? (
          <div className="mobile-header">
            <div className="mobile-top">
              <button
                className='mobile-menu-button header-hamburger'
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <Icon name={isMenuOpen ? 'close' : 'menu'} />
              </button>
              <h1 className="mobile-title" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>Courserr</h1>
              <button 
                onClick={toggleMode} 
                ref={modeToggleRef} 
                className='mobile-mode-toggle' 
                aria-pressed={isDarkMode} 
                aria-label="Toggle color mode"
              >
                <span className="mode-icon" ref={modeIconRef}>
                  <span ref={darkMode} style={{ "opacity": "0" }}><Icon name={"dark_mode"}></Icon></span>
                  <span ref={lightMode}><Icon name={"light_mode"}></Icon></span>
                </span>
              </button>
            </div>
            <div className="mobile-search">
              <Searchbar updateSearchQuery={updateSearchQuery} clearTrigger={clearTrigger}></Searchbar>
              <div className="mobile-filter-wrapper">
                <FilterDialouge isMobile={true} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 onClick={onNavigateHome}>
              <div>C</div><div>o</div><div>u</div><div>r</div><div>s</div><div>e</div><div className="italic-r">r</div><div className="italicr-r">r</div>
            </h1>

            <div className='right-alligned'>
              <div className="filter-area">
                <Searchbar updateSearchQuery={updateSearchQuery} clearTrigger={clearTrigger}></Searchbar>
                <FilterDialouge isMobile={isMobile} activeFilters={activeFilters} setActiveFilters={setActiveFilters}></FilterDialouge>
              </div>
              <button onClick={toggleMode} ref={modeToggleRef} className='mode-toggle' aria-pressed={isDarkMode} aria-label="Toggle color mode">
                <span className="mode-icon" ref={modeIconRef}>
                  <span ref={darkMode} style={{"opacity": "0"}}><Icon name={"dark_mode"}></Icon></span>
                  <span ref={lightMode}><Icon name={"light_mode"}></Icon></span>
                </span>
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
