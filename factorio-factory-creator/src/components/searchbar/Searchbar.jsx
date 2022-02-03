import React, { useState } from 'react';
import SearchbarItem from './SearchbarItem';

const Searchbar = ({ id, crafts, onClick }) => {
  const [search, setSearch] = useState('');

  const onInputChange = (e) => setSearch(e.target.value)

  const filterCraft = (craft) => {
    return search === '' || craft.item.toLowerCase().includes(search.toLowerCase())
  }

  return (
    <div className='searchbar'>
      <input className='searchbarInput' onChange={onInputChange}></input>
      {search === ''
        ? null
        : <div className='itemContainer'>
          {crafts
            .filter(filterCraft)
            .map((e, i) => (
              <SearchbarItem
                key={i}
                itemClicked={(item) => { onClick(id, item) }}
                item={e}
              />
            ))
          }
        </div>
      }
    </div>
  );
};

export default Searchbar;