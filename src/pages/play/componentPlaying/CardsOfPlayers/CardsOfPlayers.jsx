import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { playingStore } from '../../playingRedux/playingStore'
import Card from '../../card/Card'

const CardsOfPlayers = () => {
    let numberOfPlayers = playingStore.getState().numberOfPlayers

    const cardRefs = useRef([])

    const [cardRects, setCardRects] = useState([])

    const turn = useSelector((state) => state.turn)

    const cardsArr = useSelector((state) => state.valueCardPlayers)

    const playerIndex = turn % cardsArr.length

    const cardOfPlayer = cardsArr[playerIndex]

    useEffect(() => {
        let rs = []
        cardRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect()
                rs.push(rect)
            }
        })
        setCardRects(rs)
    }, [cardOfPlayer]) // Trigger when cardOfPlayer changes

    return (
        <div style={{ display: "flex", gap: "150px", marginRight: "200px" }}>
            {cardOfPlayer.map((e, i) => (
                <div key={i} ref={el => cardRefs.current[i] = el}>
                    <Card imageName={e} cardRects={cardRects} cardIndex={i} />
                </div>
            ))}
        </div>
    )
}

export default CardsOfPlayers
