// FilterBar.js

import React from 'react';
import '../css/FilterBar.css';

function FilterBar() {
  return (
    <div className="filter-bar">
      <div className="filter-block">
        <h3 className="title">Localisation</h3>
        <p className="content">Toulouse</p>
      </div>
      <div className="separator"></div>
      <div className="filter-block">
        <h3 className="title">Espèces</h3>
        <p className="content">Cactus</p>
      </div>
      <div className="separator"></div>
      <div className="filter-block">
        <h3 className="title">Durée de garde</h3>
        <p className="content">1 semaine</p>
      </div>
      <div className="separator"></div>
      <div className="filter-block">
        <h3 className="title">Classé par</h3>
        <p className="content">Les plus récents</p>
      </div>
      <button className="filter-button">Filtrer</button>
    </div>
  );
}

export default FilterBar;
