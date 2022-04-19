import styles from '../styles/layout.module.css'

const Done = () => {
  return (
    <div className={`col-md-3 ${styles.card}`}>
        <div className={`${styles.cardHead} ${styles.borderGreen}`}>
            <h4>Done</h4>
            <p>Already done.</p>
        </div>
        <div className={styles.cardBody}></div>
    </div>
  )
}

export default Done;