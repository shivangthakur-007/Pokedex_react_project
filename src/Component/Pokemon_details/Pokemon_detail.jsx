import './Pokemon-detail.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePokemonlist from '../../hooks/usePokemonlist';

function Pokemondetails(){
    const {id}= useParams();

    const [pokemon, setpokemon]= useState({});
    async function downloadpokemon(){ 
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(response.data);
        setpokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t)=> t.type.name)
        })
    }
    // console.log(setpokemon)
    const [pokemonliststate]= usePokemonlist('https://pokeapi.co/api/v2/type/fire', true)

    useEffect(() => {
        downloadpokemon();
        // console.log('list', pokemonliststate)
    }, []);

    return (
        <div className="pokemon-details-wrapper">
       <img className="pokemon_image" src={pokemon.image} />
       <div className="pokemon_name"><span> {pokemon.name} </span></div> 
       <div >Height: <span> {pokemon.height}</span></div>
       <div >Weight: <span>{pokemon.weight}</span></div>
       <div className="pokemon-types">
        {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}</div>
    <div>
        More Fire types Pokemon
        <ul>
            {pokemonliststate.pokemonlist && pokemonliststate.pokemonlist.map((p)=><li key={p.pokemon.url}> {p.pokemon.name}</li>) }
        </ul>
    </div>
    </div>
    )
}

export default Pokemondetails;