import styles from './ResultSearch.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

function Result() {
  const { pokemon } = useParams('')
  const [image, setImage] = useState('')
  const [error, setErro] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false)

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }


  useEffect(() => {
    setTimeout(
      () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, options)
      .then(response => {
        return response.json()
      }).then((data) => {
        setImage(data.sprites.front_default)
        setRemoveLoading(true)
      }).catch(() => {
        setErro("Pokemon não encontrado")
        setRemoveLoading(true)
      }),
    8,
    )
  }, [])


  return (
    <div>
    {!removeLoading && <Loading />}
      {
        removeLoading && error != "" ? (
        <div className={styles.Error}>
            <p>{error}</p>  
        </div>
        ):
        (removeLoading && <div className={styles.Content}>
          <div className={styles.Result}>
            <img src={image} />
            <p>{pokemon}</p>
          </div>
        </div>
        )
      }
    </div>

  )
}

export default Result