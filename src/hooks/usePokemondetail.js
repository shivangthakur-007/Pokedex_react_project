import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonlist from "./usePokemonlist";

function usePokemondetail(id){
    const [pokemon, setpokemon]= useState({});
    // let pokemonlistHookResponse=[];
    async function downloadpokemon(){ 
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(response.data);
        const pokemonofsametype= await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name: ''}`)

        setpokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=> t.type.name),
            similartypes: pokemonofsametype.data.pokemon
        })
        setpokemonliststate({...pokemonliststate, type: response.data.types ? response.data.types[0].type.name: ''})
      
    }
    const [pokemonliststate, setpokemonliststate]= usePokemonlist()
    
      useEffect(() => {
        downloadpokemon();
        console.log('list', pokemon.types, pokemonliststate)
    }, []);

    return [pokemon]
}
export default usePokemondetail;