import React from 'react';

const Search = (props) => {
	return (
		<div>
			<input id="searchInput" placeholder="desired calorie limit" type="text"/>
			<button id="searchButton" onClick={props.search(event.target.value)}>Find Meal Plan!</button>
		</div>
)}

export default Search;