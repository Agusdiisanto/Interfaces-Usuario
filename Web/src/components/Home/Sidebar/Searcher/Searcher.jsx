import "./Searcher.css"
import React, { useState } from 'react';
import GoBack from "../../../Accesorios/GoBack";

const Searcher = ({setQuery}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [searchText, setSearchText] = useState('')


  const handleFocus = () => {
    setShowTooltip(true);
  }

  const handleBlur = () => {
    setShowTooltip(false);
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setQuery(searchText)
    }
  }

  return (
    <div>
      <div className="title-container">
      <GoBack titulo = "Search" destino = "/Home"/>
      </div>
      <div className="search-container">
      <div className="search-bar">
      <i className="fa fa-search search-icon"></i>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar en Twitter" 
          onFocus={handleFocus} 
          onBlur={handleBlur} 
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
      </div>
      </div>
    </div>
  );
};

export default Searcher;