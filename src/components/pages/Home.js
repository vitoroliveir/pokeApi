import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import axios from 'axios';

function Content() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonDetails, SetPokemonDetails] = useState([])
  const [nextPokemons, setNextPokemons] = useState()
  const [previousPokemons, setPreviousPokemons] = useState()
  const [removeLoading, setRemoveLoading] = useState(false)

  const loadingPokemons = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=12`)
    const results = response.data.results;
    setPokemons(results)
    setNextPokemons(response.data.next)
    setPreviousPokemons(response.data.previous)
    const dataPromises = results.map(async (result) => {
      const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${result.name}`);
      return pokemonResponse.data;
    });

    const data = await Promise.all(dataPromises);
    SetPokemonDetails(data);
    setRemoveLoading(true)

  }


  useEffect(() => {
    loadingPokemons()
  }, [])



  const clearPokemons = () => {
    while (pokemons.length) {
      pokemons.pop();
      pokemonDetails.pop();
    }
  }

  const nextLoading = () => {
    clearPokemons()
    setRemoveLoading(false)

    setTimeout(async () => {
      const responseNext = await axios.get(`${nextPokemons}`)
      const resultsNext = responseNext.data.results;
      setPokemons(resultsNext)
      setNextPokemons(responseNext.data.next)
      setPreviousPokemons(responseNext.data.previous)
      const dataPromises = resultsNext.map(async (result) => {
        const pokemonResponseNext = await axios.get(`https://pokeapi.co/api/v2/pokemon/${result.name}`);
        return pokemonResponseNext.data;
      });

      const data = await Promise.all(dataPromises);
      SetPokemonDetails(data);
      setRemoveLoading(true)

    }, 8
    )

  }

  const previousLoading = async () => {
    clearPokemons()

    if (previousPokemons != null) {
      const responsePrevious = await axios.get(`${previousPokemons}`)
      const resultsPrevious = responsePrevious.data.results;
      setPokemons(resultsPrevious)
      setNextPokemons(responsePrevious.data.next)
      setPreviousPokemons(responsePrevious.data.previous)
      const dataPromises = resultsPrevious.map(async (result) => {
        const pokemonresultsPrevious = await axios.get(`https://pokeapi.co/api/v2/pokemon/${result.name}`);
        return pokemonresultsPrevious.data;
      });

      const data = await Promise.all(dataPromises);
      SetPokemonDetails(data);
    }

  }

  function capitalizarPrimeiraLetra(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }
  
  return (
    <div className={styles.Home}>
      {!removeLoading ? (<Loading />
      ) : (removeLoading && <div className={styles.Content}>
        <ul>
          {pokemonDetails.map(({ name, id,types }) => (
   
            <div className={`${styles.Pokemon} `}>
              <img src={`https://img.pokemondb.net/artwork/large/${name}.jpg`} />
              <li key={name} className={`${styles.Number}`}>#{id}</li>
              <li key={id}>{capitalizarPrimeiraLetra(name)} </li>
            </div>
          ))
          }
        </ul>

        <div className={styles.Button}>
          <button onClick={previousLoading} >
            Anterior
          </button>

          <button onClick={nextLoading} >
            Proximo
          </button>

        </div>
      </div>
      )}
    </div>
  )
}

export default Content