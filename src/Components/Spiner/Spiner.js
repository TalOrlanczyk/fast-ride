import React from 'react'
import styles from './Spiner.module.css'
const Spiner = () => {
    return (
        <div className={styles.spiner_continer}>
            <div className={styles.spinner}>
                <div className={styles.lds_dual_ring}>
                </div>
            </div>
        </div>
    )
}
export default Spiner;