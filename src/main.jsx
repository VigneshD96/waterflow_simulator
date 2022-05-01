import React from 'react'
import ReactDOM from 'react-dom/client'
import {  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './App'
import GridCreationForm from './components/GridCreationForm';
import ObsctructionCreation from './components/ObsctructionCreation';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<GridCreationForm />} />
          <Route path="obsctruction-creation" element={<ObsctructionCreation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
