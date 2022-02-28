import React, { useState } from "react";
import { useEffect } from "react";
import ReactFlow, { Background } from "react-flow-renderer";
import { fetchCrafts } from "../utils/crafts";
import { useParams } from "react-router-dom";

const TreeTab = () => {
  const {toCraft,count} = useParams()

  const [crafts, setCrafts] = useState([]);
  const [elements, setElements] = useState([]);

  useState(async ()=>{
    let c = await fetchCrafts()
    setCrafts(c)
  })

  useEffect(()=>{
    if(crafts.length > 0 && elements.length < 1){
      init();
    }
  })
  
  const init = () => {
    console.log('craft : ')
    console.log(crafts)
    const startRessources = [
      "Iron_plate",
      "Copper_plate",
      "Petroleum_gas",
      "Water",
      "Light_oil",
      "Heavy_oil",
      "Coal",
      "Solid_fuel",
    ];

    let startCraft = crafts.find((e) => e.id === toCraft);
    //console.log(startCraft.id);

    function findItem(id) {
      return crafts.find((e) => e.id === id);
    }

    function getCraftTree(itemToCraft, count) {
      let indexMap = {};
      let craft = [];

      function buildCraftTree(
        currentItemID,
        currentItemCount,
        currentIndex = 0,
        layer = 0
      ) {
        //init index map layer
        if (!indexMap[layer]) indexMap[layer] = 0;
        //console.log(indexMap);

        //stop condition
        if (startRessources.includes(currentItemID)) return;

        //pushing the first craft (result) in the list
        if (craft.length === 0) {
          if (!craft[layer]) {
            craft[layer] = [];
          }
          craft[layer].push({
            id: currentItemID,
            count: currentItemCount,
            Abscount: currentItemCount,
            item: findItem(currentItemID).item,

            parent: { layer, index: currentIndex },
          });
        }

        //adding currentItem's requirement to the layer above current item but with position of is parent
        for (let neededItem of findItem(currentItemID).needed) {
          if (!craft[layer + 1]) {
            craft[layer + 1] = [];
            indexMap[layer] = 0;
          }
          craft[layer + 1].push({
            ...neededItem,
            Abscount: neededItem.count * currentItemCount,
            parent: {
              layer,
              id: currentItemID,
              index: currentIndex,
              count: currentItemCount,
            },
          });
          buildCraftTree(
            neededItem.id,
            neededItem.count * currentItemCount,
            indexMap[layer],
            layer + 1
          );
          indexMap[layer] = indexMap[layer] + 1;
        }
      }
      buildCraftTree(itemToCraft.id, count);
      return craft;
    }
    let craft = getCraftTree(startCraft, count);

    let elements = [];

    let l = 0;
    for (let layer of craft) {
      let i = 0;
      for (let item of layer) {
        elements.push({
          id: "n" + l + "-" + i,
          type: "default",
          data: { label: item.Abscount + "/s " + item.item },
          position: { x: i * 200 + 50, y: l * 200 + 50 },
        });
        if (!(i === 0 && l === 0)) {
          elements.push({
            id: "e" + i + "," + l,
            source: "n" + item.parent.layer + "-" + item.parent.index,
            target: "n" + l + "-" + i,
            type: "normal-edge",
            animated: false,
          });
        }
        i++;
      }
      l++;
    }
    setElements(elements);
  };  

  return (
    <div className="container tab">
      <div className="reactFlow">
        <ReactFlow elements={elements} nodesDraggable={false}>
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default TreeTab;
