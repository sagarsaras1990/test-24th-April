import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [relatedimg,setRelatedImg]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonClick = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      setSelectedPokemon(response.data);

    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  return (
    <>    <div className="App row">
      <div className="pokemon-list col">
        <h2 className='pkm'>Pokemon List</h2>
        
        <table className="table">
          <tbody>
            {pokemonList.map((pokemon, index) => (
              <tr>
                <td> </td>
             <td key={index} onClick={() => handlePokemonClick(pokemon)}>{pokemon.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="pokemon-details col">
        <h2 className='pkm'>Pokemon Details</h2>
        {selectedPokemon && (
          <div>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <table className="table">
              <tbody>
                <tr>
                  <td><b>Name</b></td>
                  <td>{selectedPokemon.name}</td>
                </tr>
                <tr>
                  <td><b>Height</b></td>
                  <td>{selectedPokemon.height}</td>
                </tr>
                <tr>
                  <td><b>Weight</b></td>
                  <td>{selectedPokemon.weight}</td>
                </tr>
                <tr>
                  <td><b>Types</b></td>
                  <td>{selectedPokemon?.types[1]?.type?.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>

  );
}

export default App;

