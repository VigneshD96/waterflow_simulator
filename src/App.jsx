import { Outlet } from "react-router-dom"

function App() {

  return (
    <div className="h100p">
      <h1>Waterflow Simulator</h1>
      <Outlet/>
    </div>
  )
}

export default App
