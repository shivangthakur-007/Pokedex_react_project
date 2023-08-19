import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonlist(url, type){
const [pokemonliststate, setpokemonliststate]= useState({
        pokemonlist: [],
        isloading: true,
        pokedex_url: 'https://pokeapi.co/api/v2/pokemon',
        nexturl: '',
        prevurl: ''
    })

    async function downloadpokemon(){
        // setisloading(true);
        setpokemonliststate({...pokemonliststate, isloading: true})
        const response= await axios.get(pokemonliststate.pokedex_url)  //this download list of 20 pokemon
        // console.log(response)
        const pokemonresults = response.data.results; //we get the array of the list from result
        
        // console.log(response.data)
        // setnexturl(response.data.next)
        setpokemonliststate((state)=>({
            ...state,
            nexturl: response.data.next,
            prevurl: response.data.previous
        }))
        // setprevurl(response.data.previous)
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
    // console.log(pokelistResult);
    setpokemonliststate((state)=>({
        ...state,
        pokemonlist: pokelistResult,
        isloading: false
        }));
        // setpokemonlist(res);
    // console.log(setpokemonlist(res))
    // setisloading(false);
    }
      useEffect(()=>{
        downloadpokemon();
    }, [pokemonliststate.pokedex_url])

    return {pokemonliststate, setpokemonliststate};
}
export default usePokemonlist;