import React from 'react';

const Search = (props) => {
	return (
		<div>
			<input id="searchInput" placeholder="desired calorie limit" type="text" onChange={props.onChange}/>
			<button id="searchButton" onClick={props.search}>Get Today's Meal Plan!</button>
		</div>
)}

export default Search;