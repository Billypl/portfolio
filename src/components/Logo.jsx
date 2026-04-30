import styles from './Logo.module.css';

function Logo({ className }) {
    return (
        <h1 className={`${styles.name} ${className || ""}`}>BILLY<span>.</span></h1>
    );
}

export default Logo;