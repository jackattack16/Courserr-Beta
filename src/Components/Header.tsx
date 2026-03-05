import "../Styles/Header.css";
import FilterDialouge from "./Dialouge";
// import Icon from "./Icon";
import Searchbar from "./Searchbar";
// import TextIconButton from "./TextIconButton";

function Header() {
  return (
    <>
      <header className="grainy-bg-blur">
        <h1>
          Course<span className="italic-r">r</span>
          <span className="italicr-r">r</span>
        </h1>
        <div className="filter-area">
          <Searchbar></Searchbar>
          <FilterDialouge></FilterDialouge>
        </div>
      </header>
    </>
  );
}

export default Header;
