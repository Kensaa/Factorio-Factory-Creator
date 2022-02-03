import React, { Component } from 'react';
import TreeTab from './tabs/TreeTab';
import MainTab from './tabs/MainTab';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
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
    <div className='container app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTab/>}/>
          <Route path="/tree" element={<TreeTab/>}/>
        </Routes>
      </BrowserRouter>
    </div>);
  }
}
