import styles from './Folder.module.scss';
import {useState} from "react";

const Folder = ({ title, content }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.folder}>
            <div
                className={styles.title}
                onClick={() => setOpen(!open)}
            >
                <p>{title}</p>
                <span className={`${styles.chevron} ${open ? styles.open : ''}`}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
            </div>
            <div className={`${styles.fold} ${styles.answer} ${open ? styles.active : ''}`}>
                <div className={styles._content}>
                    <div className={styles.content}>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Folder;