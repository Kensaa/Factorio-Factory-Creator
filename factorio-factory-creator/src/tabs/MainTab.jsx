import React, { useEffect,useState } from 'react'
import Searchbar from '../components/searchbar/Searchbar';
import { fetchCrafts } from '../utils/crafts'
import {Navigate} from "react-router-dom";


const MainTab = () => {
  const [crafts, setCrafts] = useState([])
  const [redirect, setRedirect] = useState('')
  fetchCrafts().then((res)=>{setCrafts(res)})

  const searchbarSelect = (id, item) => {
    console.log('clicked item : '+item)
    setRedirect(<Navigate to={"/tree/"+item+"/5"}/>)
  }

  return (
    <div className='container tab'>
      <div className="titlebar">
        <h1 className='title'>Factorio Factory Creator</h1>
      </div>
      <Searchbar id="test" onClick={searchbarSelect} crafts={crafts}/>      
      {redirect}
    </div>
  );

  
}

export default MainTab