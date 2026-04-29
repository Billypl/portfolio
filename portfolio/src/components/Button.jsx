import clsx from "clsx";
import styles from './Button.module.css'

function Button({type, href, icon, children: text}) {
    const className = type === 'primary' ? styles.btnPrimary : styles.btnSecondary;
    return <a href={href} className={clsx(styles.button, className)}><i className={icon} aria-hidden="true"></i>&nbsp; {text}</a>
}

export default Button