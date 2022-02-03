import React, { Component } from 'react';
import SearchbarItem from './SearchbarItem';

export default class Searchbar extends Component {
    constructor(props){
      super(props)
      this.state = {search:'',crafts:[],renderedElement:[],rendered:false}

      this.fetchCrafts()

    }

    fetchCrafts = ()=>{
      fetch('crafts.json').then(res=>res.json().then(json=>{
        this.setState({crafts:json})
        //console.log(json);
      }));
    }

    onInputChange = (e)=>{
      this.setState({search:e.target.value},this.filterCrafts)
    }

    filterCrafts = ()=>{
      if(this.state.search === ''){
        this.setState({renderedElement:this.state.crafts,rendered:false})
      }else{
        let filteredCrafts = this.state.crafts.filter((e)=>(e.item.toLowerCase().includes(this.state.search.toLowerCase())))
        this.setState({renderedElement:filteredCrafts,rendered:true})
      }
    }

  render() {
    return (
        <div className='searchbar'>
            <input className='searchbarInput' onChange={this.onInputChange}></input>
            {this.state.rendered ? 
            <div className='itemContainer'>
              {this.state.renderedElement.map((e,i)=>(<SearchbarItem key={i} itemClicked={(item)=>{this.props.onClick(this.props.id,item)}} item={e}/>))}
            </div> : ''
            }
        </div>
        );
  }
}