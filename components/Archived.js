import styles from '../styles/layout.module.css'

const Archived = () => {
  return (
    <div className={`col-md-3 ${styles.card}`}>
        <div className={`${styles.cardHead} ${styles.borderBlue}`}>
            <h4>Archived</h4>
            <p>Not important but needs to write down.</p>
        </div>
        <div className={styles.cardBody}></div>
    </div>
  )
}

export default Archived;