import { useState } from "react";
import Pokemonlist from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css'
import Pokemondetails from "../Pokemon_details/Pokemon_detail";
function Pokedex(){
    const [Searchterm, Setsearchterm]= useState('')

    return(
        <div className="Pokedex-wrapper">
        <Search updatesearchterm={Setsearchterm}/>
        {(!Searchterm)?<Pokemonlist />: <Pokemondetails key={Searchterm} PokemonName={Searchterm}/>}
        </div>
    )
}
export default Pokedex;