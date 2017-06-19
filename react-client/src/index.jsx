import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      mealPlan: [];
      cal: ''
    }
    this.search.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          mealPlan: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  search(cal) {
    //this function will be a POST request
    //input: number of calories 
    //make a ajax  post request to server 
    $.ajax({
      url: '/cal/imports',
      data: cal,
      method: 'POST',
      success: (data) => {
        let data = $.parseJSON(data);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  render () {
    return (<div>
      <h1>Meal Plan</h1>
      <Search search={this.search}/>
      <List items={this.state.mealPlan}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));