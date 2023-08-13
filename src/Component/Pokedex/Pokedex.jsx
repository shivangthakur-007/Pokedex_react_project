import Pokemonlist from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css'
function Pokedex(){
    return (
        <div className="Pokedex-wrapper">
        <h1 id="pokedex-heading">Pokedex</h1>
        <Search />
        <Pokemonlist />
        </div>
    )
}
export default Pokedex;