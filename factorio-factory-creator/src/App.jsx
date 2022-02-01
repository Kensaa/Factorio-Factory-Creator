import React, { Component } from 'react';
import TreeTab from './tabs/TreeTab';
import MainTab from './tabs/MainTab';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
    <div className='container app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTab />}/>
          <Route path="/tree" element={<TreeTab/>}/>
        </Routes>
      </BrowserRouter>
    </div>);
  }
}
