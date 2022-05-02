import { useContext, useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useLocation } from 'react-router-dom';

import { WaterflowContext } from "../context/WaterflowContext";
import WaterflowGrid from "./WaterflowGrid";
import ObstructionGrid from "./ObsctructionGrid";

function ObsctructionCreation(){
    const waterflowContext= useContext(WaterflowContext);
    const location= useLocation();
    useEffect(()=>{
        let queryParams= new URLSearchParams(location.search);
        const row= queryParams.has('row') && Number(queryParams.get('row'));
        const col= queryParams.has('col') && Number(queryParams.get('col'));
        const obsc= queryParams.has('obsc') && Number(queryParams.get('obsc'));
        waterflowContext.constructWaterflowGrid(row,col);
        waterflowContext.constructObstructionMapping(obsc);
    },[])

    return(
        <DndProvider backend={HTML5Backend}>
            <div className="flex">
                <div className="w75"><WaterflowGrid/></div>
                <div className="w25"><ObstructionGrid/></div>
            </div>
        </DndProvider>
    )
}
export default ObsctructionCreation