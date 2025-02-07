import styles from "./Hero.module.scss"


const Hero = ({children, backgroundImage}) => {
    return (
        <div className={styles.hero} style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className={styles.hero__content}>
                    {children}
                </div>
            </div>
    )
}

export default Hero;