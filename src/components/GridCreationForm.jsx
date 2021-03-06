import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";

import { OBSTRUCTIONCREATION, SIMULATOR} from '../constants/Constants'

//For centralized control over the input range.
const MINRANGE=1, MAXRANGE=10, OBSTRUCTIONMINRANGE=1, OBSTRUCTIONMAXRANGE=10;
//To get/show tickmarks for input:range, based on browser support
const getOptionsList= (min,max)=> (new Array(max - (min-1))).fill(0).map((val,ind)=>{
        return <option key={ind} value={min+ind} label={(ind == min-1 || ind == max-1)? ind+1:null}></option>
    })
function GridCreation(){
    const rowsInputRef= useRef(null);
    const colsInputRef= useRef(null);
    const obstructionsInputRef= useRef(null);
    let navigate= useNavigate(); 

    useEffect(()=>{
        rowsInputRef.current.value=MINRANGE;
        colsInputRef.current.value=MINRANGE;
        obstructionsInputRef.current.value=OBSTRUCTIONMINRANGE;
    },[]);

    function sendToNextStep(e){
        const row= Number(rowsInputRef.current.value);
        const col= Number(colsInputRef.current.value);
        const obsc= Number(obstructionsInputRef.current.value);
        if(row*col <= obsc){
            alert("Obstructions count must be lesser than the number of available grid boxes");
            return
        }
        const queryString= new URLSearchParams({ row, col, obsc }).toString();
        navigate(`/${SIMULATOR}/${OBSTRUCTIONCREATION}?` + queryString);
    }

    return(
        <div>
            <h3>
                Grid creation
            </h3>
            <div className="form">
                <div className="form-ele">
                    <label htmlFor="rows">Number of rows (between {MINRANGE} and {MAXRANGE}):</label>
                    <input ref={rowsInputRef} type="range" name="rows" id="rows" list="rows-list-tickmarks" max={MAXRANGE} min={MINRANGE} step="1"/>
                    <datalist id="rows-list-tickmarks"> {getOptionsList(MINRANGE,MAXRANGE)} </datalist>
                </div>
                <div className="form-ele">
                    <label htmlFor="cols">Number of columns (between {MINRANGE} and {MAXRANGE}):</label>
                    <input ref={colsInputRef} type="range" name="cols" id="cols" list="cols-list-tickmarks" max={MAXRANGE} min={MINRANGE} step="1"/>
                    <datalist id="cols-list-tickmarks"> {getOptionsList(MINRANGE,MAXRANGE)} </datalist>
                </div>
                <div className="form-ele">
                    <label htmlFor="obstructions">Number of obstructions (between 1 and 10):</label>
                    <input ref={obstructionsInputRef} type="range" name="obstructions" id="obstructions" list="obstructions-list-tickmarks" max={OBSTRUCTIONMAXRANGE} min={OBSTRUCTIONMINRANGE} step="1"/>
                    <datalist id="obstructions-list-tickmarks"> {getOptionsList(OBSTRUCTIONMINRANGE,OBSTRUCTIONMAXRANGE)} </datalist>
                </div>
                <div className="form-ele">
                    <button className="p5" onClick={sendToNextStep}>Next</button>
                </div>
            </div>
        </div>
    )
}
export default GridCreation