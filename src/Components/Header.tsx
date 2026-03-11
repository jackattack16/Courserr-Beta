import "../Styles/Header.css";
import FilterDialouge from "./Dialouge";
// import Icon from "./Icon";
import Searchbar from "./Searchbar";
// import TextIconButton from "./TextIconButton";
import useWindowDimensions from '../assets/windowSizeHook';

type headerProps = {
  updateSearchQuery: (query: string) => void;
  clearTrigger?: number;
}
function Header( {updateSearchQuery, clearTrigger}: headerProps) {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  return (
    <>
      <header className="grainy-bg-blur">

        {isMobile ? (
          <h1 className="mobile-title">Courserr</h1>
        ) : (
          <h1>
            <div>C</div><div>o</div><div>u</div><div>r</div><div>s</div><div>e</div><div className="italic-r">r</div><div className="italicr-r">r</div>
          </h1>
        )}

        <div className="filter-area">
          <Searchbar updateSearchQuery={updateSearchQuery} clearTrigger={clearTrigger}></Searchbar>
          {isMobile ? <></> : <FilterDialouge isMobile={isMobile}></FilterDialouge>}
        </div>
      </header>
    </>
  );
}

export default Header;
