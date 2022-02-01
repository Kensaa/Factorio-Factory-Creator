import React, { Component } from 'react';
import Searchbar from '../components/Searchbar';

export default class MainTab extends Component {
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
