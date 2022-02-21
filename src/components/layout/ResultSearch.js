import styles from './ResultSearch.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Result() {
  const { pokemon } = useParams('')
  const [image, setImage] = useState('')
  const [error, setErro] = useState('')

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const resultPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, options)
      .then(response => {
        return response.json()
      }).then((data) => {
        setImage(data.sprites.front_default)
      }).catch(() => {
        setErro("Pokemon não encontrado")
      })
  }

  useEffect(() => {
    resultPokemons()
  }, [])


  return (
    <>
      {
        error != "" ? (
        <div className={styles.Error}>
            <p>{error}</p>  
        </div>
        ):
        (<div className={styles.Content}>
          <div className={styles.Result}>
            <img src={image} />
            <p>{pokemon}</p>
          </div>
        </div>
        )
      }
    </>

  )
}

export default Result