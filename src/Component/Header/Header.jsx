import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <img src="images/troll.png" alt="" />
            <h2>Meme Generator</h2>
        </div>
        <div className={styles.right}>
            <h4>Project Goal - Usestate</h4>
        </div>
    </div>
  )
}

export default Header
