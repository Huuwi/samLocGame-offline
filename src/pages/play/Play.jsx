import React, { use, useEffect, useRef, useState } from 'react';
import styles from "./Play.module.css";
import DivCard from './componentPlaying/divCard/DivCard';
import { disPatchMethods, playingStore } from './playingRedux/playingStore';
import { useDispatch } from 'react-redux';
import AnimateDivCard from './componentPlaying/animateDivCard/AnimateDivCard';
import { divCard } from './logic.mjs';
import Card from './card/Card';
import CardsOfPlayers from './componentPlaying/CardsOfPlayers/CardsOfPlayers';
import Test from './Test';

const Play = ({ players }) => {

    const [myCards, setMyCards] = useState([]);

    const disPatch = useDispatch()

    const playerRefs = useRef([]);

    const rectArr = useRef([])

    const cardDeckRef = useRef(null);

    const quantityOfPlayers = playingStore.getState().quantityCardPlayers

    let [clickDiv, setClickDiv] = useState(false)

    let [reRender, setReRender] = useState(0)

    const [divCardMotion, setDivCardMotion] = useState(null);

    const [divDone, setDivDone] = useState(false)

    function cbr() {
        setReRender(reRender + 1)
    }

    useEffect(() => {
        disPatch(disPatchMethods.changeNumberOfplayer({ numberOfPlayers: players.length }))

        rectArr.current = [];

        playerRefs.current.forEach((ref) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                rectArr.current.push(rect);
            }
        });

        let rectCardDeck = cardDeckRef.current.getBoundingClientRect();

        const motion = <AnimateDivCard loop={10} rectArr={rectArr.current} rectCardDeck={rectCardDeck} duration={0.01} cbr={cbr} />

        setDivCardMotion(motion);
    }, [players]);


    const playerDivs = players.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <div
                ref={el => (playerRefs.current[i] = el)}
                style={{
                    backgroundImage: `url("${e.img}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    height: "100px",
                    width: "100px"
                }}
            >
                {e.name}
            </div>
            <DivCard number={quantityOfPlayers[i]} disPlay={clickDiv} reRender={reRender} />
        </div>
    ));

    function handleClickDiv() {
        setClickDiv(true)
        let interval2 = setInterval(() => {
            setReRender(reRender + 1)
            if (playingStore.getState().quantityCardPlayers[playerDivs.length - 1] == 10) {
                disPatch(disPatchMethods.addValueCards({ divCardArr: divCard(players.length) }))
                setMyCards(<CardsOfPlayers />);
                clearInterval(interval2)
                // setTimeout(() => {
                //     disPatch(removeCard({ indexArr: [0, 1, 2] }))
                // }, 10000);
                setDivDone(true)
            }
        }, 100)
    }

    useEffect(() => {
        let interval3 = setInterval(() => {
            setReRender(reRender + 1)
            if (playingStore.getState().quantityCardPlayers[playerDivs.length - 1] == 10) {
                clearInterval(interval3)
            }
        }, 100)
    }, [clickDiv])


    return (
        <div className={styles["playContainer"]}>
            <div className={styles["table"]}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    {playerDivs.slice(0, 3)}
                </div>

                {!divDone ? <div className={styles['cardDeck']} ref={cardDeckRef} >
                    {!clickDiv ? <button style={{ height: "30px", width: "80px", marginBottom: "90px" }} onClick={handleClickDiv}>Chia bai</button> : <p />}
                </div> : null}

                <div style={{ display: "flex" }}>
                    {playerDivs.length > 3 ? playerDivs.slice(3) : <div />}
                </div>
                {clickDiv ? divCardMotion : <p />}

            </div>
            {<button className={styles["fightBtn"]}>Danh bai</button>}

            {divDone ? myCards : null}
            {/* <Test /> */}
        </div>);
};

export default Play;
