import { useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../components/Logo';
import { useLanguage }    from "../context/LanguageContext";
import { LanguageToggle } from "../components/LanguageToggle";
import { T }              from "../components/T";

const links = [
  { key: "nav.aboutme",          href: "#aboutme"          },
  { key: "nav.educationandwork", href: "#educationandwork" },
  { key: "nav.skills",           href: "#skills"           },
  { key: "nav.projects",         href: "#projects"         },
  { key: "nav.timeline",         href: "#timeline"         },
  { key: "nav.hobby",            href: "#hobby"            },
  { key: "nav.contact",          href: "#contact"          },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <nav className={`${styles.navbar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>BILLY</div>

        {/* Right side: links + toggle + hamburger */}
        <div className={styles.navRight}>

          {/* Desktop links */}
          <div className={styles.navlink}>
            <ul>
              {links.map(({ key, href }) => (
                <a key={href} href={href}>
                  <li><T tkey={key} /></li>
                </a>
              ))}
            </ul>
          </div>

          <LanguageToggle />
          
          <button
            className={`${styles.menuBtn} ${isOpen ? styles.menuOpen : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
        <Logo className={styles.overlayLogo} />
        <ul className={styles.overlayLinks}>
          {links.map(({ key, href }, i) => (
            <li key={href} style={{ "--i": i }}>
              <a href={href} onClick={() => setIsOpen(false)}><T tkey={key} /></a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;