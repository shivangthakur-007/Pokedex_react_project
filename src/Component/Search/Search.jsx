import useDebounce from '../../hooks/useDebounce';
import './Search.css'
function Search({updatesearchterm}){
    const debouncedcallback= useDebounce((e)=> updatesearchterm(e.target.value));
    return (
        <div className='search-wrapper'>
        <input
        id='pokemon-name-search'
        type="text"
        placeholder="Pokedex name..." 
        onChange={debouncedcallback}/>
        </div>
    )

}
export default Search;