import styles from './ResultSearch.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import axios from 'axios';

function Result() {
  const { pokemon } = useParams('')
  const [image, setImage] = useState('')
  const [error, setErro] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false)
  const [pokemonDetails, SetPokemonDetails] = useState([])


  useEffect(() => {
    setTimeout(async () => {
      try {
        const responseImage = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const resultsImage = responseImage.data;
        setImage(resultsImage.sprites.front_default)

        const pokemonresults = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        SetPokemonDetails(pokemonresults.data);
        setRemoveLoading(true)
      } catch (e) {
        setErro("Pokemon não encontrado")
        setRemoveLoading(true)
      }
    },
      8
    )
  }, [])

  console.log(pokemonDetails);


  return (
    <div className={styles.Body}>
      {!removeLoading && <Loading />}
      {
        removeLoading && error != "" ? (
          <div className={styles.Error}>
            <p>{error}</p>
          </div>
        ) :
          (removeLoading && <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{pokemonDetails.name}</h1>
            <img src={image} />
            
            <div>
              <h3>Número:</h3>
              <p>#{pokemonDetails.id}</p>
            </div>
            <div>
              <h3>Tipo:</h3>
              <div className={styles.types_container}>
                {pokemonDetails.types.map((item, index) => (
                  <span
                    key={index}
                    className={`${styles.type} ${styles['type_' + item.type.name]}`}
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.data_container}>
              <div className={styles.data_height}>
                <h4>Altura:</h4>
                <p>{pokemonDetails.height * 10} cm</p>
              </div>
              <div className={styles.data_weight}>
                <h4>Peso:</h4>
                <p>{pokemonDetails.weight / 10} kg</p>
              </div>
            </div>
          </div>
          )
      }
    </div>

  )
}

export default Result