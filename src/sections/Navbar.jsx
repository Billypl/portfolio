import { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../components/Logo';

const links = [
  { label: "O MNIE",           href: "#aboutme"    },
  { label: "EDUKACJA I PRACA", href: "#educationandwork"  },
  { label: "UMIEJĘNOŚCI",      href: "#skills"     },
  { label: "PROJEKTY",         href: "#projects"   },
  { label: "TIMELINE",         href: "#timeline"   },
  { label: "HOBBY",            href: "#hobby"      },
  { label: "KONTAKT",          href: "#contact"    },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>BILLY</div>

        {/* Desktop */}
        <div className={styles.navlink}>
          <ul>
            {links.map(({ label, href }) => (
              <a key={href} href={href}>
                <li>{label}</li>
              </a>
            ))}
          </ul>
        </div>

        {/* Hamburger / X */}
        <button
          className={`${styles.menuBtn} ${isOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
        <Logo className={styles.overlayLogo} />
        <ul className={styles.overlayLinks}>
          {links.map(({ label, href }, i) => (
            <li key={href} style={{ "--i": i }}>
              <a href={href} onClick={() => setIsOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;