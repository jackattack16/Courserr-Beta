import type { Dispatch, SetStateAction } from 'react';
import "../Styles/Header.css";
import FilterDialouge from "./Dialouge";
// import Icon from "./Icon";
import Searchbar from "./Searchbar";
// import TextIconButton from "./TextIconButton";
import useWindowDimensions from '../assets/windowSizeHook';
import useScrollDirection from '../assets/useScrollDirection';
import type { FilterState } from '../assets/filterTypes';

type headerProps = {
  updateSearchQuery: (query: string) => void;
  clearTrigger?: number;
  activeFilters: FilterState;
  setActiveFilters: Dispatch<SetStateAction<FilterState>>;
}
function Header( {updateSearchQuery, clearTrigger, activeFilters, setActiveFilters}: headerProps) {
  const { width } = useWindowDimensions();
  const { scrollDirection, isScrolled } = useScrollDirection();
  const isMobile = width <= 768;
  const hideHeader = isMobile && isScrolled && scrollDirection === 'down';

  return (
    <>
      <header className={`grainy-bg-blur${hideHeader ? ' header-hidden' : ''}`}>

        {isMobile ? (
          <h1 className="mobile-title">Courserr</h1>
        ) : (
          <h1>
            <div>C</div><div>o</div><div>u</div><div>r</div><div>s</div><div>e</div><div className="italic-r">r</div><div className="italicr-r">r</div>
          </h1>
        )}

        <div className="filter-area">
          <Searchbar updateSearchQuery={updateSearchQuery} clearTrigger={clearTrigger}></Searchbar>
          {isMobile ? <></> : <FilterDialouge isMobile={isMobile} activeFilters={activeFilters} setActiveFilters={setActiveFilters}></FilterDialouge>}
        </div>
      </header>
    </>
  );
}

export default Header;
