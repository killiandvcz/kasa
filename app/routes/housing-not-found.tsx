import { Link } from "react-router";
import errorStyles from "./Error.module.scss";

export default function NotFound() {

  return (
      <>
        <main className={errorStyles.error}>
          <h1>404</h1>
          <p>Oups! La page que vous demandez n'existe pas.</p>
          <Link
              to="/"
          >
            <span className="goBack">Retourner sur la page d'accueil</span>
          </Link>
        </main>
      </>
  );
}