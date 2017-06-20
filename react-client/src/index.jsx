import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      mealPlan: [],
      cal: 0,
      nutrition: {}
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        let len = data.length;
        const random = Math.floor(Math.random() * len);
        this.setState({
          mealPlan: data[random].meal,
          nutrition: {
            totalCal: data.totalCal,
            totalProtein: data.totalProtein,
            totalFat: data.totalFat,
            totalCarbs: data.totalCarbs
          }
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleChange(e) {
    // console.log(e.target.value);
    this.setState({cal: e.target.value});
  }

  search() {
    $.ajax({
      url: '/cal/imports',
      data: {cal: this.state.cal},
      method: 'POST',
      success: (data) => {
        // console.log($.parseJSON(data));
        var data = $.parseJSON(data);
        this.setState({mealPlan: data.meals, nutrition: data.nutrients});
      },
      error: (err) => {
        console.log(err);
      }
  
    })
  }// <h1 id="heading">Weekly Meal Plan</h1>
  render () {
    return (<div>
      <Search search={this.search.bind(this)} onChange={this.handleChange.bind(this)}/>
      <List meals={this.state.mealPlan} nutrients={this.state.nutrition}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));