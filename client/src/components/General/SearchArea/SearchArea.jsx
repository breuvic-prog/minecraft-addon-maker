import filterIcon from "../../../assets/filter.png";
import gridIcon from "../../../assets/grid.png";
import menuIcon from "../../../assets/menu.png";
import rowIcon from "../../../assets/row.png";
import searchIcon from "../../../assets/search.png";

import "./SearchArea.css";

const SearchArea = ({}) => {
  
  
  return (
    <div className="search-area">
      <div className="search-bar-area">
        <img src={searchIcon} alt="Search" />
        <input className = "search-bar-input" placeholder="Search Addons"/>
      </div>
      <button className="search-button">
        <img className = "icon" src={filterIcon} alt="Filter" />
      </button>
      <div className="page-view-area">
        <button className="search-button">
          <img className = "icon" src={gridIcon} alt="Grid" /> 
        </button>
        <button className="search-button">
          <img className = "icon" src={rowIcon} alt="Row" />
        </button>
      </div>
    </div>

  );
};

export default SearchArea;