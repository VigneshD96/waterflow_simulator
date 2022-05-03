import { createContext, useCallback, useState } from "react";
import {produce} from 'immer';
import { useLocation } from "react-router-dom";

export const WaterflowContext= createContext();

const getInitialWaterflowGridState=()=>{
    const location= useLocation();
    let queryParams= new URLSearchParams(location.search);
        const row= queryParams.has('row') && Number(queryParams.get('row'));
        const col= queryParams.has('col') && Number(queryParams.get('col'));
        const obscMap= queryParams.has('obsc_m') && queryParams.get('obsc_m');
    if(row && col && obscMap){
        let obscMapArr=[]
        obscMap.split("-").forEach(subStr => obscMapArr.push(subStr.split("_")) )
        let tempState=[];
        for(let i=0;i<row;i++){
            if(!tempState[i]) tempState[i]=[];
            for(let j=0;j<col;j++){
                if(obscMapArr.findIndex( arr => (i==Number(arr[0]) && j==Number(arr[1]))) > -1){
                    tempState[i][j]={isObstruction:true, isFlowing:false}
                }else{
                    tempState[i][j]={isObstruction:false, isFlowing:false}
                }
            }
        }
        return tempState;
    }else{
        return []
    }
}

const WaterFlowProvider = ({children})=>{
    const [waterflowGrid, setWaterflowGrid]=useState(getInitialWaterflowGridState());
    const [obstructionMapping, setObstructionMapping]= useState([]);
    const constructWaterflowGrid=(row,col)=>{
        setWaterflowGrid(produce((draft)=>{
            for(let i=0;i<row; i++){
                if(!draft[i]) draft[i]=[];
                for(let j=0;j<col;j++){
                    draft[i][j]={isObstruction:false, isFlowing:false}
                }
            }
        }));
    }

    const constructObstructionMapping=(len)=>{
        setObstructionMapping(produce((draft)=>{
            for(let i=0;i<len;i++){
                draft[i]={isMapped:false, gridPosition:[]};
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
    const resetWaterflowGridWithObstructions=useCallback(()=>{
        setWaterflowGrid(produce((draft)=>{
            draft.forEach((arr,i)=>{
                arr.forEach((ele, j)=>{
                    if(draft[i][j].isObstruction){ 
                        draft[i][j]={isObstruction:true, isFlowing:false}
                    }else{
                        draft[i][j]={isObstruction:false, isFlowing:false}
                    }
                });
            });
        }));
    })
    return(
        <WaterflowContext.Provider value={{
                waterflowGrid, constructWaterflowGrid, updateWaterflowGrid, resetWaterflowGridWithObstructions,
                obstructionMapping, constructObstructionMapping, updateObstructionMapping
            }}>
            {children}
        </WaterflowContext.Provider>
    )
}
export default WaterFlowProvider
