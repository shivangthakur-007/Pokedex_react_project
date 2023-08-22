import axios from "axios";
import { useEffect, useState } from "react";
// import Pokemon from "../Component/Pokemon/Pokemon";

function usePokemondetail(id, PokemonName){
    const [pokemon, setpokemon]= useState({});
    // let pokemonlistHookResponse=[];
    async function downloadpokemon(){ 
        try {
            let response;
        if(PokemonName){
            response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`);
        }else{
            response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        }
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
      
        } catch (error) {
            console.log('Something went wrong')
        }
    }
    const [pokemonliststate, setpokemonliststate]= useState({})
    
      useEffect(() => {
        downloadpokemon();
        // console.log('list', pokemon.types, pokemonliststate)
    }, []);

    return [pokemon]
}
export default usePokemondetail;