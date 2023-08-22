import './Pokemon-detail.css';
import { useParams } from "react-router-dom";
import usePokemondetail from '../../hooks/usePokemondetail';

function Pokemondetails({PokemonName}){
   const {id}= useParams();
    // console.log(setpokemon)
    const [pokemon]= usePokemondetail(id, PokemonName);   
    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon_image" src={pokemon.image} />
            <div className="pokemon_name"><span> {pokemon.name} </span></div> 
            <div >Height: <span> {pokemon.height}</span></div>
            <div >Weight: <span>{pokemon.weight}</span></div>
            <div className="pokemon-types">
            {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>

        {
           pokemon.types && pokemon.similartypes &&
            <div>
                more {pokemon.types[0]} type pokemons
                <ul>
                    {pokemon.similartypes.map((p)=> <li key={p.pokemon.id}>{p.pokemon.name}</li>)}
                </ul>
            </div>

        }
        {/* {pokemon.types &&
    <div>
        More {pokemon.types[0]} types Pokemon
        <ul>
            {pokemonlistHookResponse.pokemonlist && pokemonlistHookResponse.pokemonlist.map((p)=><li key={p.pokemon.url}> {p.pokemon.name}</li>) }
        </ul>
    </div>
} */}
    </div>
    )
}

export default Pokemondetails;