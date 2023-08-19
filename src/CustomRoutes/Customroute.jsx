import { Routes, Route } from "react-router-dom";
import Pokedex from "../Component/Pokedex/Pokedex";
import Pokemondetails from "../Component/Pokemon_details/Pokemon_detail";


function CustomRoutes(){
    return (
<Routes>
    <Route path="/" element ={<Pokedex />}/>
    <Route path="/pokemon/:id" element={<Pokemondetails />}/>
</Routes>
    )
}

export default CustomRoutes;