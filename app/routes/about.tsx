import type { Route } from "./+types/home";
import Folder from "~/components/atoms/Folder";
import styles from "./About.module.scss";
import Hero from "~/components/atoms/Hero";
import HeroImg from "~/assets/hero.jpg";
import AboutCover from '~/assets/aboutCover.jpg';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "About" },
        { name: "description", content: "About Kasa" },
    ];
}



export default function About() {
    return (
        <div className={styles.about}>
            <Hero backgroundImage={AboutCover}></Hero>
            <div className={styles.folders}>
                <Folder title="Fiabilité" content="Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées  par nos équipes." />
                <Folder title="Respect" content="La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme." />
                <Folder title="Service" content="La qualité du service est au cœur de notre engagement chez Kasa. Nous veillons à ce que chaque interaction, que ce soit avec nos hôtes ou nos locataires, soit empreinte de respect et de bienveillance." />
                <Folder title="Sécurité" content="La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés. Nous organisons également des ateliers sur la sécurité domestique pour nos hôtes." />
            </div>
        </div>
    );
}