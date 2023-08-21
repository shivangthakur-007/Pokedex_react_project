// import { useState } from "react";
// import { useEffect } from "react";
// import axios from 'axios';
import './Pokemonlist.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonlist from "../../hooks/usePokemonlist";

function PokemonList(){
    const [pokemonliststate, setpokemonliststate]= usePokemonlist(false);

    return (
    <div className="pokemon-list-wrapper">
       <div className="pokemon-wrapper">
        {(pokemonliststate.isloading) ? 'loading...' : pokemonliststate.pokemonlist.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
        </div> 
        <div className="controls">
    <button disabled={pokemonliststate.prevurl == null} onClick={()=> setpokemonliststate({...pokemonliststate, pokedex_url: pokemonliststate.prevurl})}>Prev</button>
    <button disabled= {pokemonliststate.nexturl == null} onClick={()=> setpokemonliststate({...pokemonliststate, pokedex_url: pokemonliststate.nexturl})}>Next</button>
        </div>
    </div>
    ) 
} 

export default PokemonList; 