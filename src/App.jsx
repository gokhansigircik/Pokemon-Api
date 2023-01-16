import './App.css';
import React, { useState, useEffect } from 'react';

const API_URL_SinglePokemon = 'https://pokeapi.co/api/v2/pokemon/'
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=898&offset=0';  //pokemon api 
//?limit=***&offset to set the number of return data

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [ show, setShow ] = useState(false)  //testing state   //decrease the load time but decrease the efficiency
  // const [search, setSearch] = useState('');


  const searchPokemon = async()=>{
      const response = await fetch(`${API_URL}`);  //fetching the api
      const data = await response.json();   //jsonify the fetch data
      let result = [];  //temp variable to hold the desired data

      await Promise.all(   //promise.all allows async function to be inside another async function.. not quite sure what it does.
        data.results.map(async (pokemon)=>{  //using the previous fetched data to do another fetch, in here, pokemon === previous fetched data
          const response = await fetch(pokemon.url); 
          const data = await response.json();
          result.push({ 
            name: pokemon.name, //name is from the first api data, so using paramter 'pokemon'
            id: data.id, //data is the second fetched data variable
            img: data.sprites?.front_default,  //? because some pokemon might not have a front_default// how do i set a catch?
          })
        })
        )
        setPokemons(result);  //set the pokemon to the temp variable
  }

  const shiny= async(e,id)=>{
    const response = await fetch(`${API_URL_SinglePokemon+id}`)
      const data = await response.json();
      // console.log(data)
      const frontDefault = data.sprites.front_default;
      const backDefault = data.sprites.back_default;
      const frontShiny = data.sprites.front_shiny;
      const backShiny = data.sprites.back_shiny;
      // const timer = setTimeout(() =>{
      if(e.target.src === frontDefault){
        e.target.src = backDefault;
      }
      else if(e.target.src === backDefault ){
        e.target.src = frontShiny;
      }
      else if(e.target.src === frontShiny){
        e.target.src = backShiny;
      }
      else{
        e.target.src = frontDefault
      }
  }

  return (
    <div className="App">
      <div>
        {/* <button onClick={()=>(catchEmAll())}>Fetch Pokemon</button> */}
        <button onClick={()=>(searchPokemon())}>Fetch Pokemon</button>
          {/* <p>{JSON.stringify(pokemons)}</p> */}
            {/* {show? */}
            <div className='pokeDex'>
            {
              pokemons.map((pokemon)=>{
                return <p key={pokemon.id} className='pokemonTag'><img src={pokemon.img} onClick={e=>shiny(e, pokemon.id)}/>ID:{pokemon.id} Name:{pokemon.name}</p>
              })
            } </div>
            {/* :
            ''
          } */}
      </div>
    </div>
  );
}

export default App;
