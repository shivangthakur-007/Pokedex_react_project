import Pokemonlist from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css'
function Pokedex(){
    return (
        <div className="Pokedex-wrapper">
        <Search />
        <Pokemonlist />
        </div>
    )
}
export default Pokedex;