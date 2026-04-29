import styles from './Navbar.module.css'

function Navbar() {
    return (<>
    <nav className={styles.navbar}>
        <div className={styles.logo}> BILLY </div>
        <div className={styles.navlink}>
            <ul>
                <a href="#about">      <li> O MNIE     </li></a>
                <a href="#projects">   <li> PROJEKTY   </li></a>
                <a href="#education">  <li> EDUKACJA   </li></a>
                <a href="#experience"> <li> PRACA      </li></a>
                <a href="#contact">    <li> KONTAKT    </li></a>
            </ul>
        </div>
    </nav>
    </>);
}

export default Navbar
