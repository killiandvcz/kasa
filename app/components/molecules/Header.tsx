import Logo from "~/components/icons/Logo";
import styles from "./Header.module.scss";
import {NavLink} from "react-router";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles._}>
                <span className={styles.logo}>
                    <Logo/>
                </span>
                <nav>
                    <NavLink to={"/"}
                             className={({isActive}) => isActive ? styles.active : ""}
                    >Accueil</NavLink>
                    
                    <NavLink to={"/about"}
                             className={({isActive}) => isActive ? styles.active : ""}
                    >A propos</NavLink>
                </nav>
            </div>
        </header>
    )
}