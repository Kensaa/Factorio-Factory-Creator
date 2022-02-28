import React from 'react';
import TreeTab from './tabs/TreeTab';
import MainTab from './tabs/MainTab';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const App = () => {
  return (
    <div className='container app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTab />} />
          <Route path="/tree/:toCraft/:count/" element={<TreeTab />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;