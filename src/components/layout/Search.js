import styles from './Search.module.css'
import Loupe from '../../img/loupe.svg'
import { React, useState } from 'react'

function Search() {
  const [pokemon , setPokemon] = useState('')

  function onChange(e){
    setPokemon(e.target.value)
  }
  
  return (
    <div className={styles.SearchBox}>
        <input className={styles.SearchText} type="text" onChange={onChange} placeholder='Pesquise um pokemon'/>
        <a className={styles.SearchBtn}  href={`${pokemon?"/result/" + pokemon: "/"}`}>
            <img src={Loupe} alt="lupa" height={20} width={20}/>
        </a>
    </div>
  )
}

export default Search

