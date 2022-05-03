import { useContext } from "react";
import {useDrop} from "react-dnd"
import { WaterflowContext } from "../context/WaterflowContext";

function DropableSquare({arr, rowInd, colInd}){
    let {updateWaterflowGrid}=useContext(WaterflowContext);
    const [, dropRef] = useDrop(() => ({
        accept: "test",
        drop: ()=>{
            updateWaterflowGrid(rowInd,colInd,{isObstruction: true,isFlowing:false})
            return{mapping:[rowInd,colInd]}
        }
    }))
    return(
        <td ref={(arr.isObstruction)? null:dropRef} className={`${(arr.isObstruction)? `obstruction` : ''} ${arr.isFlowing? `flowing` : ''}`}></td>
    )
}
function WaterflowGrid(){
    let {waterflowGrid}=useContext(WaterflowContext);
    return (
        <table>
            <tbody>
                {
                    waterflowGrid.map((subArr,rowInd)=>{
                        return (
                            <tr key={rowInd}>
                                {subArr.map((arr,colInd)=>(<DropableSquare arr={arr} rowInd={rowInd} colInd={colInd}  key={rowInd+"_"+colInd}/>))}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default WaterflowGrid