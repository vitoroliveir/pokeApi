import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

function Content() {
  const [pokemons, setPokemons] = useState([])
  const [nextPokemons, setNextPokemons] = useState()
  const [previousPokemons, setPreviousPokemons] = useState()
  const [removeLoading, setRemoveLoading] = useState(true)

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const loadingPokemons =  () => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=15", options)
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

  const nextLoading =  () => {
    clearPokemons()
    setRemoveLoading(false)

    setTimeout(
      fetch(`${nextPokemons}`, options)
        .then(response => {
          return response.json()
        }).then((data) => {
          setPokemons(data.results)
          setNextPokemons(data.next)
          setPreviousPokemons(data.previous)
          setRemoveLoading(true)
        }),
      8,
      )

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
    <div className={styles.Home}>
    {!removeLoading ? (<Loading />
    ):(removeLoading && <div className={styles.Content}>
          <ul>
            {pokemons.map(({ name }) => (
              <div className={styles.Pokemon}>
                <img src={`https://img.pokemondb.net/artwork/large/${name}.jpg`} />
                <li key={name} >{name}</li>
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