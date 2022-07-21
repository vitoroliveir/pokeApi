import '../../styles/settings/colors.css'
import '../../styles/gereric/reset.css'
import styles from './Header.module.css'

import Search from './Search'

function Header() {
  return (
    <header className={styles.Header}> 
        <div>
        <a href={`${"/"}`}> 
            <p>
              PokeApi
            </p>
        </a>
        </div>
        
        <Search/>
    </header>
  )
}

export default Header