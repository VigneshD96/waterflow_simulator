import { Outlet } from "react-router-dom"
import WaterFlowProvider from "../context/WaterflowContext"

function Simulator(){
    return(
        <div>
            <WaterFlowProvider>
                <Outlet/>
            </WaterFlowProvider>
        </div>
    )
}

export default Simulator