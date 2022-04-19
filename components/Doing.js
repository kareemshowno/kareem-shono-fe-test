import styles from '../styles/layout.module.css'

const Doing = () => {
  return (
    <div className={`col-md-3 ${styles.card}`}>
        <div className={`${styles.cardHead} ${styles.borderOrange}`}>
            <h4>Doing</h4>
            <p>What you're doing</p>
        </div>
        <div className={styles.cardBody}></div>
    </div>
  )
}

export default Doing