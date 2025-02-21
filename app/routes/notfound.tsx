import { Link } from "react-router";
import errorStyles from "./Error.module.scss";

export default function HousingNotFound() {

  return (
      <>
        <div className={errorStyles.error}>
          <h1>404</h1>
          <p>Oups! Le logement que vous demandez n'existe pas.</p>
          <Link to="/">
            <span className="goBack">Retourner sur la page d'accueil</span>
          </Link>
        </div>
      </>
  );
}