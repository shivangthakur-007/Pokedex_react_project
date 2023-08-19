import CustomRoutes from "./CustomRoutes/Customroute"
// import Pokedex from "./Component/Pokedex/Pokedex"
import { Link } from "react-router-dom"
import './App.css'

function App() {

  return (
    <div className="outer-pokedex-heading">
      <h1 id="pokedex-heading">
        <Link to="/">Pokedex</Link></h1>
      <CustomRoutes />
    </div>
  )
}

export default App
