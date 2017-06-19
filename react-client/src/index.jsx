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
      cal: 0
    }
    // this.search.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          mealPlan: data,
          cal: 1500
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({cal: e.target.value});
  }

  search() {
    $.ajax({
      url: '/cal/imports',
      data: this.state.cal,
      method: 'POST',
      success: (data) => {
        console.log(data);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  render () {
    return (<div>
      <h1>Weekly Meal Plan</h1>
      <Search search={this.search.bind(this)} onChange={this.handleChange.bind(this)}/>
      <List items={this.state.mealPlan}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));