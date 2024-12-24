// filepath: /c:/Users/chith/Downloads/react-food-ordering/frontend/src/components/Meals/MealTypeFilter.js
import React, { useState } from 'react';
import classes from './MealTypeFilter.module.css';
import ServiceRequest from './ServiceRequest';

const MealTypeFilter = ({ selectedType, onTypeChange, onSearch, tableInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isServiceRequestShown, setIsServiceRequestShown] = useState(false);

  const handleTypeChange = (event) => {
    onTypeChange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const showServiceRequestHandler = () => {
    setIsServiceRequestShown(true);
  };

  const hideServiceRequestHandler = () => {
    setIsServiceRequestShown(false);
  };

  return (
    <div>
      {isServiceRequestShown && <ServiceRequest onClose={hideServiceRequestHandler} tableInfo={tableInfo} />}
      <div className={classes.serviceButtonContainer}>
        <button className={classes.serviceButton} onClick={showServiceRequestHandler}>
        <i className={`fas fa-user-tie ${classes.serviceIcon}`}></i>
          Ask for service
        </button>
      </div>
      <div className={classes.filterContainer}>
        <select className={classes.select} value={selectedType} onChange={handleTypeChange}>
          {['ALL', 'SET_ONLY', 'HOT_DISHES', 'DRINKS'].map((type) => (
            <option className={classes.option} key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className={classes.searchContainer}>
          <input
            type="text"
            className={classes.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
          />
          <i className={`fas fa-search ${classes.searchIcon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default MealTypeFilter;