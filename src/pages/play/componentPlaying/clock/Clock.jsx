import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from "./Clock.module.css"
import { disPatchMethods, playingStore } from '../../playingRedux/playingStore'
import { useDispatch, useSelector } from 'react-redux'

const Clock = ({ time }) => {

    const turn = useSelector((state) => { return state.turn })

    const [timeRest, setTimeRest] = useState(time)

    const [reRender, setReRender] = useState(1)

    const disPatch = useDispatch()

    function handleOverTime() {

        if (!playingStore.getState().cardInTable?.length) {
            let selectedCards = playingStore.getState().selectedCards
            if (selectedCards?.length == 0) {
                const valueCardPlayer = playingStore.getState().valueCardPlayers[playingStore.getState().turn % playingStore.getState().numberOfPlayers]
                disPatch(disPatchMethods.changeSelectedStatus({ imageName: valueCardPlayer[0] }))
                selectedCards = playingStore.getState().selectedCards
            }
            disPatch(disPatchMethods.updateCardInTable())
            disPatch(disPatchMethods.removeCardByValue({ valueArr: selectedCards }))
            disPatch(disPatchMethods.clearSelectedStatus())
            disPatch(disPatchMethods.increTurn())
            const rest = playingStore.getState().valueCardPlayers[(playingStore.getState().turn - 1) % playingStore.getState().numberOfPlayers]

            if (!rest.length) {
                alert("you win!")
                location.reload()
            }
            return
        }
        disPatch(disPatchMethods.increSkip())
    }
    useEffect(() => {
        setTimeRest(time)
        setReRender(reRender + 1)
    }, [turn])

    useEffect(() => {

        let itv = setInterval(() => {
            if (timeRest == 0) {
                clearInterval(itv)
                handleOverTime()
                return
            }
            setTimeRest(timeRest - 1)
        }, 1000);

        return () => {
            if (itv) {
                clearInterval(itv)
            }
        }

    }, [timeRest])


    return (
        <div className={styles["clockContainer"]}>
            <motion.div
                key={reRender}
                className={styles["secondHand"]}
                initial={{ scale: 0.8, rotate: 0 }} // Giật nhẹ khi bắt đầu
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                    duration: time,
                    ease: "linear",
                    rotate: { duration: time, ease: "linear" },
                    scale: { duration: 0.3, ease: "easeOut" }
                }}
            />

            <p className={styles["time"]} >{timeRest}</p>
        </div>
    )
}

export default Clock



