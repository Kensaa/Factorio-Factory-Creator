import React, { Component } from 'react';

export default class SearchbarItem extends Component {
  render() {
    return (
    <div className='searchbarItem unselectable'>
        {this.props.item.item}
    </div>
    );
  }
}
