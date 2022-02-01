import React, { Component } from 'react';

export default class Searchbar extends Component {
    state = {elements:[],renderedElement:[],rendered:false}
  render() {
    return (
        <div className='searchbar'>
            <input></input>
        </div>);
  }
}
