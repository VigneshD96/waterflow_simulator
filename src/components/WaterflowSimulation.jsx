import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {OBSTRUCTIONCREATION, SIMULATOR} from '../constants/Constants'
import { WaterflowContext } from '../context/WaterflowContext';
import WaterflowGrid from './WaterflowGrid';

let copyOfWaterGridState=[];

function WaterflowSimulation(){
    const {waterflowGrid, updateWaterflowGrid, resetWaterflowGridWithObstructions}= useContext(WaterflowContext);
    const location= useLocation();
    const navigate= useNavigate();
    let queryParams= new URLSearchParams(location.search);
    const col= queryParams.has('col') && Number(queryParams.get('col'));

    const [inletPosition, setInletPosition]= useState(null);
    const createCopyWaterflowGridState=()=>{
        for(let i=0;i<waterflowGrid.length;i++){
            if(!copyOfWaterGridState[i]){ copyOfWaterGridState[i]=[] }
            for(let j=0;j<waterflowGrid[0].length;j++){
                copyOfWaterGridState[i][j]={...waterflowGrid[i][j]}
            }
        }
    }

    const startSimulation= (colPos, rowPos)=>{
        if(copyOfWaterGridState[rowPos][colPos].isObstruction){
            return;
        }else{
            updateWaterflowGrid(rowPos,colPos,{isObstruction:false,isFlowing:true});
            copyOfWaterGridState[rowPos][colPos]={isObstruction:false,isFlowing:true,isVisited:true}
            if(rowPos < copyOfWaterGridState.length-1 ){
                if(copyOfWaterGridState[rowPos+1][colPos].isObstruction){
                    if(colPos-1 > -1 && !copyOfWaterGridState[rowPos][colPos-1].isObstruction && !copyOfWaterGridState[rowPos][colPos-1].isVisited) {
                        startSimulation(colPos-1,rowPos);
                    }
                    if(colPos < col-1 && !copyOfWaterGridState[rowPos][colPos+1].isObstruction && !copyOfWaterGridState[rowPos][colPos+1].isVisited ) {
                        startSimulation(colPos+1,rowPos);
                    }
                }else{
                    startSimulation(colPos,rowPos+1)
                }
            }
        }
    }
    const inletOnClickHandler=(colSelected,e)=>{
        setInletPosition(old => colSelected);
    }
    useEffect(()=>{
        if(inletPosition == null) return
        createCopyWaterflowGridState();
        startSimulation(inletPosition,0);
    },[inletPosition]);

    const goToPrevStep=()=>{
        const searchParamsObj= new URLSearchParams(location.search);
        searchParamsObj.delete('obsc_m');
        navigate(`/${SIMULATOR}/${OBSTRUCTIONCREATION}?` + searchParamsObj.toString());
    }
    const resetWaterFlowGrid=()=>{
        setInletPosition(old=> null);
        resetWaterflowGridWithObstructions();
    }
    return(
        <div> 
            {(inletPosition==null)?
                (<div className="p15">Select water inlet, by clicking on any blue square and proceed </div>)
                :
                (<div className="p15">Simulated water flow looks like</div>)
            }
            <div className="p15">
                {(inletPosition==null) && 
                    (<div className="w100 center-content inlet-container">
                            <WaterflowInlet col={col} parentClickHandler={inletOnClickHandler} inletPosition={inletPosition}/>
                    </div>)
                }
                {(inletPosition!=null) && 
                    (<div className="w100 center-content header-footer-container">
                            <WaterflowHeader col={col} inletPosition={inletPosition}/>
                    </div>)
                }
                <div className="w100 center-content">
                    <WaterflowGrid/>
                </div>
                {(inletPosition!=null) && 
                    (<div className="w100 center-content header-footer-container">
                            <WaterflowFooter waterflowGridOutlet={waterflowGrid[waterflowGrid.length-1]}/>
                    </div>)
                }
                <div className="w100 p15 center-content">
                    <button className='p5 mr25' onClick={goToPrevStep}>Back</button>
                    <button disabled={(inletPosition==null)?true:false} className='p5' onClick={resetWaterFlowGrid}>Reset</button>
                </div>
            </div>
        </div>
    )
}
function WaterflowInlet({inletPosition, col, parentClickHandler}){
    return(
        <table>
            <tbody>
                <tr>
                    {Array(col).fill(0).map((val,ind)=>(
                        <td className={(inletPosition==ind)? 'sel':''} key={ind} onClick={(e)=>{parentClickHandler(ind,e)}}></td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}
function WaterflowHeader({col, inletPosition}){
    return(
        <table>
            <tbody>
                <tr>
                    {Array(col).fill(0).map((val,ind)=>(
                        <td className={(inletPosition==ind)? 'sel':''} key={ind}></td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}
function WaterflowFooter({waterflowGridOutlet}){
    return(
        <table>
            <tbody>
                <tr>
                    {waterflowGridOutlet.map((obj,ind)=>(
                        <td className={(obj.isFlowing)? 'sel':''} key={ind}></td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}
export default WaterflowSimulation