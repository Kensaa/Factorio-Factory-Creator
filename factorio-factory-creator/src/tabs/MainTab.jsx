import React, { Component } from 'react'
import Searchbar from '../components/searchbar/Searchbar';
import { fetchCrafts } from '../utils/crafts'
import {Navigate} from "react-router-dom";
/*import { Redirect } from 'react-router'*/


/*export default MainTab;*/


export default class MainTab extends Component {
  constructor(props){
    super(props)
    this.state = {crafts:[],currentItem:'',redirect:''}
    fetchCrafts().then((res)=>{this.setState({crafts:res})})
  }

  searchbarSelect = (id, item) => {
    this.setState({currentItem:item},()=>{
      this.setState({redirect:<Navigate to="/tree" state={{test:"test"}}/>})
    })
  }
  render() {
    return (
      <div className='container tab'>
        <div className="titlebar">
          <h1 className='title'>Factorio Factory Creator</h1>
        </div>
        <Searchbar id="test" onClick={this.searchbarSelect} crafts={this.state.crafts}/>      
        {this.state.redirect}
      </div>
    );
  }
}
