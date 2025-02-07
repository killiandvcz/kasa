import type { Route } from "./+types/home";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {db} from "~/data/data.js";
import ImageCarousel from "~/components/atoms/Slider";
import styles from "./Housing.module.scss";
import Folder from "~/components/atoms/Folder";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Housing" },
        { name: "description", content: "Housing" },
    ];
}

export default function Housing() {
    let {id} = useParams();

    const [logement, setLogement] = useState([]);

    useEffect(() => {
        const fetchLogement = async () => {
            try {
                const data = await db.findById(id);
                setLogement(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLogement();
    })


    return (
        <div className={styles.housing}>
            {logement.pictures && <ImageCarousel images={logement.pictures} />}
            
            <div className={styles.head}>
                <h1>{logement.title}</h1>
                <span className="location">{logement.location}</span>
                <div className={styles.tags}>
                    {logement.tags && logement.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
            </div>
            <div className={styles.content}>
            
                <Folder 
                    title={"Description"}
                    content={logement.description}
                />
                {logement?.equipments?.length > 0 && <Folder 
                    title={"Equipements"}
                    content={logement.equipments.map((equipement) => <><span key={equipement}>{equipement}</span><br /></>)}
                />}
                
            </div>

        </div>
    );
}