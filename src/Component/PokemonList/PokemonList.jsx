import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import './Pokemonlist.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    const [pokemonlist, setpokemonlist]= useState([]);
    const [isloading, setisloading]= useState(true)

    const pokedex_url= 'https://pokeapi.co/api/v2/pokemon'
    async function downloadpokemon(){
        const response= await axios.get(pokedex_url)  //this download list of 20 pokemon
        // console.log(response)
        const pokemonresults = response.data.results; //we get the array of the list from result
        
        console.log(response.data)
        //iterating over the array of pokemons, and using their url, to create an array of promises. 
        //that will download list of 20 pokemon.
        // console.log(pokemonresults)
        const pokemonresultpromise = pokemonresults.map((pokemon)=> axios.get(pokemon.url)) 
        // console.log(pokemonresultpromise)
        const pokemondata=await axios.all(pokemonresultpromise) //passing that array into axios.all
        // console.log(pokemondata);

        //now iterate on the data of each pokemon, and extract id, name, image and types.
        const pokelistResult= pokemondata.map((pokedata) => {
            const pokemon= pokedata.data;
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny, 
                types: pokemon.types
            }
        });
    console.log(pokelistResult);
    setpokemonlist(pokelistResult);
    // console.log(setpokemonlist(res))
    setisloading(false);
    }
    useEffect(()=>{
        downloadpokemon();
    }, [])
    // const [x, setx]=useState(0);
    // const [y, sety]=useState(0);
    return (
    <div className="pokemon-list-wrapper">
    <div>Pokemon list </div>
        {(isloading) ? 'loading...' : pokemonlist.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)}
        
    </div>
    // {/* x: {x} <button onClick={()=> setx(x+ 1)}>INC</button> */}
    // {/* y: {y} <button onClick={()=> sety(y+ 1)}>INC</button> */}
    )
}
export default PokemonList;