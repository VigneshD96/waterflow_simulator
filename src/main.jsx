import React from 'react'
import ReactDOM from 'react-dom/client'
import {  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {  SIMULATOR, SIMULATIONOUTPUT, OBSTRUCTIONCREATION } from "./constants/Constants";

import App from './App'
import GridCreationForm from './components/GridCreationForm';
import ObstructionCreation from './components/ObstructionCreation';
import WaterflowSimulation from './components/WaterflowSimulation';
import SimulationContainer from './components/SimulationContainer';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<GridCreationForm />} />
          <Route path={SIMULATOR} element={<SimulationContainer />} >
            <Route path={OBSTRUCTIONCREATION} element={<ObstructionCreation />} />
            <Route path={SIMULATIONOUTPUT} element={<WaterflowSimulation />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
)
