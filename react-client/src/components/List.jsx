import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => {
	console.log(props);
	return (
	<div>
	  <div>
	    <h4> List Component </h4>
	    There are { props.meals.length } items.
	    { props.meals.map((meal,index) => <ListItem meal={meal} key={index}/>)}
	  </div>
	  <div>
	  	Total Calories: {props.nutrients.totalCal}
	  	Total Protein: {props.nutrients.totalProtein}
	  	Total Fat: {props.nutrients.totalFat}
	  	Total Carbs: {props.nutrients.totalCarbs}
	  </div>
	</div>
  )
}

export default List;