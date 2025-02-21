import type { Route } from "./+types/home";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {db} from "~/data/data.js";
import ImageCarousel from "~/components/atoms/Slider";
import styles from "./Housing.module.scss";
import Folder from "~/components/atoms/Folder";
import Rating from "~/components/atoms/Rating";

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
                // redirect to "logement-non-trouve"

                window.location.href = "/logement-non-trouve";
            }
        };

        fetchLogement();
    })


    return (
        <div className={styles.housing}>
            {logement.pictures && <ImageCarousel images={logement.pictures} />}
            
            <div className={styles.head}>
                <div className={styles.info}>
                    <h1>{logement.title}</h1>
                    <span className="location">{logement.location}</span>
                    <div className={styles.tags}>
                        {logement.tags && logement.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                </div>
                <div className={styles.owner}>
                    <div className={styles.host}>
                        <span className={styles.name}>{logement.host?.name}</span>
                        <div className="avatar">
                            <img src={logement.host?.picture} alt={logement.host?.name} />
                        </div>
                    </div>
                    <div className="rating">
                        <Rating rating={logement.rating} />
                    </div>
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