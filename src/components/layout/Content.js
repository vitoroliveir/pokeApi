import styles from './Content.module.css'
import { useState, useEffect } from 'react'

function Content() {
  const [pokemons, setPokemons] = useState([])
  const [nextPokemons, setNextPokemons] = useState()
  const [previousPokemons, setPreviousPokemons] = useState()

  const options = {
    method: 'GET',
    mode: "cors",
    cache: 'default'
  }

  const loadingPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20", options)
      .then(response => {
        return response.json()
      }).then((data) => {
        setPokemons(data.results)
        setNextPokemons(data.next)
        setPreviousPokemons(data.previous)
      })
  }


  useEffect(() => {
    loadingPokemons()
  }, [])

  const clearPokemons = () => {
    while (pokemons.length) {
      pokemons.pop();
    }
  }

  const nextLoading = () => {
    clearPokemons()

    fetch(`${nextPokemons}`, options)
      .then(response => {
        return response.json()
      }).then((data) => {
        setPokemons(data.results)
        setNextPokemons(data.next)
        setPreviousPokemons(data.previous)
      })

  }

  const previousLoading = () => {
    clearPokemons()

    fetch(`${previousPokemons}`, options)
      .then(response => {
        return response.json()
      }).then((data) => {
        setPokemons(data.results)
        setNextPokemons(data.next)
        setPreviousPokemons(data.previous)
      })

  }


  return (
    <div className={styles.Content}>

      <ul>
        {pokemons.map(({ name }) => (
          <li>{name}</li>
        ))}
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
  )
}

export default Content