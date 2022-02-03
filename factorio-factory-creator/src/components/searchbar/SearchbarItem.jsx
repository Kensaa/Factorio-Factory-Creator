import React from 'react';

const SearchbarItem = ({ item, itemClicked }) => (
  <div className='searchbarItem unselectable' onClick={() => { itemClicked(item.id) }}>
    {item.item}
  </div>
);

export default SearchbarItem;