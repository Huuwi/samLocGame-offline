import React, { useEffect, useState } from 'react'
import styles from "./DivCard.module.css"

const DivCard = ({ number, disPlay, quantiy }) => {

    let [nums, setNums] = useState(number)

    useEffect(() => {

    }, [nums])

    return (
        <>
            {disPlay ? <div className={styles['divCardContainer']}>
                <p style={{ textAlign: "center" }} > {number}</p>
            </div> : <p>0</p>}
        </>
    )
}

export default DivCard
