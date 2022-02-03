import React, { Component } from 'react';
import ReactFlow from 'react-flow-renderer'

export default class TreeTab extends Component {
  constructor(props) {
    super(props)
    this.state = { crafts: this.props.crafts, elements: [] }
  }

  init = () => {
    let elements = []
    elements.push({
      id: 'n1',
      type: 'input',
      data: { label: 'node 1' },
      position: { x: 0, y: 0 }
    })
    elements.push({
      id: 'n2',
      type: 'output',
      data: { label: 'node 2' },
      position: { x: 200, y: 125 }
    })
    elements.push({ id: 'e1-2', source: 'n1', target: 'n2', type: 'smoothstep', animated: true })


    this.setState({ elements })
  }

  render() {
    return (
      <div className='container tab'>
        <div className='reactFlow'>
          <ReactFlow elements={this.state.elements} nodesDraggable={true} />
        </div>
      </div>
    )
  }
}
