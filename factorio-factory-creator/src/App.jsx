import React, { Component } from 'react';
import ReactFlow from 'react-flow-renderer';

export default class App extends Component {

  elements = [
    {
      id:'1',
      type:'input',
      data:{label:'node 1'},
      position: { x: 250, y: 25 }
    },
    {
      id:'2',
      type:'output',
      data:{label:'node 2'},
      position: { x: 200, y: 125 }
    },
    {id:'e1-2',source:'1',target:'2',type:'smoothstep',animated:true}
  ]

  render() {
    return(
      <div>
        <div className='reactFlow'>
          <ReactFlow elements={this.elements} nodesDraggable={false}/>
        </div>

      </div>
    )
  }
}
