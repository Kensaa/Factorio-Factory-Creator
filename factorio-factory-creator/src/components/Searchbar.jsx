import React, { Component } from 'react';
import SearchbarItem from './SearchbarItem';

export default class Searchbar extends Component {
    state = {search:'',elements:[],renderedElement:[],rendered:false}
    maxRenderedItem = 5;

    onInputChange = (e)=>{
      this.setState({search:e.target.value},this.filterElements)
    }

    filterElements = ()=>{
      
    }

  render() {
    return (
        <div className='searchbar'>
            <input className='searchbarInput' onChange={this.onInputChange}></input>
            <div className='itemContainer'>
              <SearchbarItem/>
              <SearchbarItem/>
              <SearchbarItem/>
              <SearchbarItem/>
            </div>
        </div>
        );
  }
}