import { createContext, useCallback, useEffect, useState } from "react";
import {produce} from "immer";
export const WaterflowContext= createContext();

const WaterFlowProvider = ({children})=>{
    const [waterflowGrid, setWaterflowGrid]=useState([]);
    const [obstructionMapping, setObstructionMapping]= useState([]);
    const constructWaterflowGrid=(row,col)=>{
        setWaterflowGrid(produce((draft)=>{
            for(let i=0;i<row; i++){
                let tempColObj=[];
                for(let j=0;j<col;j++){
                    tempColObj.push({isObstruction:false, isFlowing:false})
                }
                draft.push(tempColObj);
            }
        }));
    }

    useEffect(()=>{
        console.log(waterflowGrid);
    },[waterflowGrid]);

    const constructObstructionMapping=(len)=>{
        setObstructionMapping(produce((draft)=>{
            for(let i=0;i<len;i++){
                draft.push({isMapped:false, gridPosition:[]});
            }
        }))
    }
    const updateWaterflowGrid=useCallback((rowInd, colInd, newState)=>{
        setWaterflowGrid(produce((draft)=>{
            draft[rowInd][colInd]=newState;
        }));
    })
    const updateObstructionMapping=useCallback((ind,newState)=>{
        setObstructionMapping(produce((draft)=>{
            draft[ind]= newState;
        }));
    })
    return(
        <WaterflowContext.Provider value={{
                waterflowGrid, constructWaterflowGrid, updateWaterflowGrid,
                obstructionMapping, constructObstructionMapping, updateObstructionMapping
            }}>
            {children}
        </WaterflowContext.Provider>
    )
}
export default WaterFlowProvider
