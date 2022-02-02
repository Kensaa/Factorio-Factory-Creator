import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';

export default class MainTab extends Component {
  constructor(props){
    super(props)
    this.state = {crafts:[]}

    this.fetchCrafts()
  }

  fetchCrafts = ()=>{
    fetch('crafts.json').then(res=>res.json().then(json=>{
      this.setState({crafts:json})
      //console.log(json);
    }));
  }

  render() {
    return (
        <div className='container tab mainTab'>
          <div className="titlebar">
            <h1 className='title'>Factorio Factory Creator</h1>
          </div>
          <Searchbar/>
        </div>);
  }
}
