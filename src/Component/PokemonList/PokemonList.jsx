import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import './Pokemonlist.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    const [pokemonlist, setpokemonlist]= useState([]);
    const [isloading, setisloading]= useState(true)

    const [pokedex_url, setpokedex_url]= useState('https://pokeapi.co/api/v2/pokemon')

    const [nexturl, setnexturl]= useState('')
    const [prevurl, setprevurl]= useState('')

    async function downloadpokemon(){
        setisloading(true);
        const response= await axios.get(pokedex_url)  //this download list of 20 pokemon
        // console.log(response)
        const pokemonresults = response.data.results; //we get the array of the list from result
        
        console.log(response.data)
        setnexturl(response.data.next)
        setprevurl(response.data.previous)
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
    }, [pokedex_url])
    // const [x, setx]=useState(0);
    // const [y, sety]=useState(0);
    return (
    <div className="pokemon-list-wrapper">
       <div className="pokemon-wrapper">
        {(isloading) ? 'loading...' : pokemonlist.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)}
        </div> 
        <div className="controls">
        <button disabled={prevurl == null} onClick={()=> setpokedex_url(prevurl)}>Prev</button>
        <button disabled= {nexturl == null} onClick={()=> setpokedex_url(nexturl)}>Next</button>
        </div>
    </div>
    // {/* x: {x} <button onClick={()=> setx(x+ 1)}>INC</button> */}
    // {/* y: {y} <button onClick={()=> sety(y+ 1)}>INC</button> */}
    )
}
export default PokemonList;