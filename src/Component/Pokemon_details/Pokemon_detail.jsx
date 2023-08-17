import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Pokemondetails(){
    const {id}= useParams();

    const {pokemon, setpokemon}= useState({});
    async function downloadpokemon(){ 
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response);
        setpokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=> t.type.name)
        })
    }
    
    useEffect(() => {
        downloadpokemon();
    }, []);

    return (
        <div className="pokemon-details-wrapper">
       <div className="pokemon_name"> name: {pokemon.name} </div> 
       <img className="pokemon_image" src={pokemon.image} />
       <div className="pokemon-height">Height: {pokemon.height}</div>
       <div className="pokemon-weight">Weight: {pokemon.weight}</div>
       <div className="pokemon-types">
        {pokemon.types.map((t)=><div key={t}>{t}</div>)}</div>
        </div>
    )
}

export default Pokemondetails;