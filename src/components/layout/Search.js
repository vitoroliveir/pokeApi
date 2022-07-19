import styles from './Search.module.css'
import Loupe from '../../img/loupe.svg'
import { React, useEffect, useRef, useState } from 'react'

function Search() {
  const [pokemon , setPokemon] = useState('')
  const nameInputRef = useRef()
  const [className,  setClassName] = useState(styles.SearchText)

  useEffect(()=>{
    nameInputRef.current.focus();
  },[])

  function onChange(e){
    setPokemon(e.target.value)
  }

  function handleClick() {
    
   document.addEventListener("click",()=>{
      if(className == styles.SearchText){
        setClassName(styles.SearchClick)
      }else{
        setClassName(styles.SearchText)
      }
    })
   }
  
  return (
    <div className={styles.SearchBox}   >
        <input className={className} type="text" onChange={onChange} id="input" onClick={handleClick}  ref={nameInputRef} placeholder='Pesquise um pokemon'/>
        <a className={styles.SearchBtn}  href={`${pokemon?"/result/" + pokemon: "/"}`}>
            <img src={Loupe} alt="lupa" height={20} width={20}/>
        </a>
        
    </div>
  )
}

export default Search

