import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="h100p txt-align-center">
      <h1>Waterflow Simulator</h1>
      <Outlet/>
    </div>
  )
}

export default App
