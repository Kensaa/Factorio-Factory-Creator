import React, { Component } from 'react'
import ReactFlow from 'react-flow-renderer'
import { fetchCrafts } from '../utils/crafts'


export default class TreeTab extends Component {
  constructor(props) {
    super(props)
    this.state = { crafts: [], elements: [], toCraft: 'Satellite' }
    fetchCrafts().then((res) => {
      this.setState({ crafts: res }, this.init)
    })


  }

  init = () => {
    const crafts = this.state.crafts
    const toCraft = this.state.toCraft
    const startRessources = [
      'Iron_plate',
      'Copper_plate',
      'Petroleum_gas',
      'Water',
      'Light_oil',
      'Heavy_oil',
      'Coal',
      'Solid_fuel'
    ]
    /*    elements.push({
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
    */




    let craft = []

    let startCraft = crafts.find((e) => (e.id === toCraft))
    console.log(startCraft.id);

    function findItem(id) {
      return crafts.find((e) => (e.id === id))
    }

    function buildCraftTree(currentItem, currentIndex = 0, layer = 0) {
      //stop condition
      if (startRessources.includes(currentItem)) return;
      //pushing the first craft (result) in the list
      if (craft.length === 0) {
        if (!craft[layer]) {
          craft[layer] = []
        }
        craft[layer].push({
          id: currentItem,
          item: findItem(currentItem).item,

          parent: { layer, index: currentIndex }
        })
      }

      //adding currentItem's requirement to the layer above current item but with position of is parent 
      let index = 0
      for (let neededItem of findItem(currentItem).needed) {
        if (!craft[layer + 1]) {
          craft[layer + 1] = []
        }
        craft[layer + 1].push(
          {
            ...neededItem,
            //id:neededItem.id,
            parent: { layer, index: currentIndex }
          })
        buildCraftTree(neededItem.id, index, layer + 1)
        index++
      }

    }
    buildCraftTree(startCraft.id)
    console.log('res : ');
    console.log(craft);

    let elements = []

    let l = 0
    for (let layer of craft) {
      let i = 0
      for (let item of layer) {
        elements.push({
          id: 'n' + l + '-' + i,
          type: 'default',
          data: { label: item.item },
          position: { x: i * 200 + 50, y: l * 200 + 50 }
        })
        if (!(i === 0 && l === 0)) {
          console.log(item.parent.layer);
          console.log(item.parent.index);
          elements.push({
            id: 'e' + i + ',' + l,
            source: 'n' + item.parent.layer + '-' + item.parent.index,
            target: 'n' + l + '-' + i,
            type: 'normal-edge',
            animated: false
          })
        }

        i++
      }
      l++

    }


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

/*

const TreeTab = ()=>{
  const [crafts, setCrafts] = useState([]);
  const [elements, setElements] = useState([])

  const toCraft = 'Transport_belt'

  useEffect(() => {
    fetchCrafts().then((res)=>{
      setCrafts(res,);
      init()
    })
  }, []);

  const init = () => {
    /*let elements = []
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

    setElements(elements)
    console.log(crafts);
    let craft = crafts.find((e)=>(e.id===toCraft))
    console.log(craft);
  }
  return (
    <div className='container tab'>
      <div className='reactFlow'>
        <ReactFlow elements={elements} nodesDraggable={true} />
      </div>
    </div>
  )
}

export default TreeTab*/