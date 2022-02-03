import React, { Component } from 'react';

export default class SearchbarItem extends Component {
  render() {
    return (
      <div className='searchbarItem unselectable' onClick={() => { this.props.itemClicked(this.props.item.id) }}>
        {this.props.item.item}
      </div>
    );
  }
}
