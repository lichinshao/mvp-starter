import React from 'react';

const ListItem = (props) => {
	return (
  <div>
  	<div id="title"><b>{props.meal.title}</b></div>
  	<img id="picture" src={`https://spoonacular.com/recipeImages/${props.meal.id}-312x231.jpg`}/>
  </div>
)}

export default ListItem;