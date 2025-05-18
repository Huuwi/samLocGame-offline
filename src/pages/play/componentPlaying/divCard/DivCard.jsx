import React, { useEffect, useState } from 'react'
import styles from "./DivCard.module.css"
import { useSelector } from 'react-redux'

const DivCard = ({ disPlay, playerIndex }) => {

    let valueCardPlayers = useSelector((state) => { return state.valueCardPlayers })

    return (
        <>
            {disPlay ? <div className={styles['divCardContainer']}>
                <p style={{ textAlign: "center" }} > {valueCardPlayers[playerIndex]?.length || 0}</p>
            </div> : null}
        </>
    )
}

export default DivCard
