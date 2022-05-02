import { useContext } from "react";
import {useDrag} from "react-dnd"
import { WaterflowContext } from "../context/WaterflowContext";

function ObstructionGrid(){
    let {obstructionMapping}=useContext(WaterflowContext)
    return(
        <div className="grid grid-2-cols">
        {  
            obstructionMapping.map((obj,ind)=> (<DragableSquare key={ind} ind={ind} obj={obj}/>))
        }
        </div>
    )
}
function DragableSquare({obj, ind}){
    let {updateObstructionMapping}=useContext(WaterflowContext)
    const [{ opacity }, dragRef] = useDrag(
        () => ({
          type: 'test',
          end:(item,monitor)=>{
                // console.log(`onEnd from drag source`,ind,monitor.getDropResult());
                let pos= monitor.getDropResult() && monitor.getDropResult().mapping;
                if(pos){
                    updateObstructionMapping(ind,{isMapped:true,gridPosition:pos})
                }
          },
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
          })
        }),
        []
    );
    const backgroundColor=obj.isMapped? '#ddd': '#666';
    return(
        <div ref={obj.isMapped? null : dragRef} style={{opacity, backgroundColor}} className="grid-ele"></div>
    )
}
export default ObstructionGrid;