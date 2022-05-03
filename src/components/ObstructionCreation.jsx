import { useContext, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { WaterflowContext } from "../context/WaterflowContext";
import WaterflowGrid from "./WaterflowGrid";
import ObstructionGrid from "./ObsctructionGrid";

import { SIMULATOR, SIMULATIONOUTPUT} from '../constants/Constants'

const customArrayFlatten= (arr)=>{
    return arr.reduce((result, currentObj)=>{
        return (currentObj.gridPosition && currentObj.gridPosition.length>0)? ((result.length>0)? `${currentObj.gridPosition.join("_")}-${result}` : currentObj.gridPosition.join("_")): result
    },'')
}

function ObsctructionCreation(){
    const waterflowContext= useContext(WaterflowContext);
    let [obscMap, setObscMap]= useState('');
    const location= useLocation();
    const navigate= useNavigate();
    useEffect(()=>{
        let queryParams= new URLSearchParams(location.search);
        const row= queryParams.has('row') && Number(queryParams.get('row'));
        const col= queryParams.has('col') && Number(queryParams.get('col'));
        const obsc= queryParams.has('obsc') && Number(queryParams.get('obsc'));
        waterflowContext.constructWaterflowGrid(row,col);
        waterflowContext.constructObstructionMapping(obsc);
    },[])
    //monitor changes in `obstructionMapping` and re-evaluate `obscMap`
    useEffect(()=>{
        setObscMap(customArrayFlatten(waterflowContext.obstructionMapping));
    },[waterflowContext.obstructionMapping]);

    const getNewSearchString=()=>{
        let searchParamsObj= new URLSearchParams(location.search.toString());
        if(obscMap.length>0) searchParamsObj.append(`obsc_m`,obscMap);
        return `?${searchParamsObj.toString()}`
    }
    const goToNextStep=()=>{
        navigate(( `/${SIMULATOR}/${SIMULATIONOUTPUT}`+getNewSearchString() ))
    }
    return(
        <div>
            <h3>
                Obstruction mapping
            </h3>
            <div className="p15">Drag and drop the obstructions (- blocks to you right) into the grid</div>
            <div className="flex p15">
                <div className="w75 mr50"><WaterflowGrid/></div>
                <div className="w25"><ObstructionGrid/></div>
            </div>
            <div className="p15">
                <Link to={`/`}>
                    <button className="p5 mr50">Back</button>
                </Link>
                {/* <Link to={(obscMap.length>0)? getNextStepURL():null}> */}
                    <button onClick={goToNextStep} disabled={obscMap.length>0? false:true} className="p5 mr50">Next step</button>
                {/* </Link> */}
            </div>
        </div>
    )
}
export default ObsctructionCreation