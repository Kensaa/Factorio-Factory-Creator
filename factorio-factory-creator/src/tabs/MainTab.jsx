import React, { useEffect, useState } from 'react';
import Searchbar from '../components/searchbar/Searchbar';
import { fetchCrafts } from '../utils/crafts'

const MainTab = () => {
  const [crafts, setCrafts] = useState([]);

  useEffect(() => {
    fetchCrafts().then(setCrafts)
  }, []);

  const searchbarSelect = (id, item) => {
    console.log(`Item ${item} selected in ${id}`);
  }

  return (
    <div className='container tab'>
      <div className="titlebar">
        <h1 className='title'>Factorio Factory Creator</h1>
      </div>
      <Searchbar id="test" onClick={searchbarSelect} crafts={crafts}/>
    </div>
  );
};

export default MainTab;
