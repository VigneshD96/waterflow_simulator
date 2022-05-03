import { Outlet } from "react-router-dom"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import WaterFlowProvider from "../context/WaterflowContext"

function Simulator(){
    return(
        <div>
            <WaterFlowProvider>
                <DndProvider backend={HTML5Backend}>
                    <Outlet/>
                </DndProvider>
            </WaterFlowProvider>
        </div>
    )
}

export default Simulator