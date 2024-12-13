import type { Route } from "./+types/home";
import Hero from "~/assets/hero.jpg";
import styles from "./Home.module.scss";
import {db} from "~/data/data.js";
import { useState, useEffect } from 'react';

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Home" },
        { name: "description", content: "Welcome to Kasa" },
    ];
}

export default function Home() {
    const [logements, setLogements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogements = async () => {
            try {
                const data = await db.findAll();
                setLogements(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLogements();
    }, []);


    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <>
            <div className={styles.hero} style={{backgroundImage: `url(${Hero})`}}>
                <div className={styles.hero__content}>
                    <h1>Chez vous, partout et ailleurs</h1>
                </div>
            </div>
            <div className={styles.gallery}>
                {logements.map((logement) => (
                    <div
                        key={logement.id}
                        className={styles.gallery__item}
                        style={{backgroundImage: `url(${logement.cover})`}}
                    >
                        <div className={styles.gallery__content}>
                            <h2>{logement.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}