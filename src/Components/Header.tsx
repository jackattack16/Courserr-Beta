import "../Styles/Header.css";
import FilterDialouge from "./Dialouge";
// import Icon from "./Icon";
import Searchbar from "./Searchbar";
// import TextIconButton from "./TextIconButton";

type headerProps = {
  updateSearchQuery: (query: string) => void;
  clearTrigger?: number;
}
function Header( {updateSearchQuery, clearTrigger}: headerProps) {
  return (
    <>
      <header className="grainy-bg-blur">
        
        <h1>
          <div>C</div><div>o</div><div>u</div><div>r</div><div>s</div><div>e</div><div className="italic-r">r</div><div className="italicr-r">r</div>
        </h1>
        
        <div className="filter-area">
          <Searchbar updateSearchQuery={updateSearchQuery} clearTrigger={clearTrigger}></Searchbar>
          <FilterDialouge></FilterDialouge>
        </div>
      </header>
    </>
  );
}

export default Header;
