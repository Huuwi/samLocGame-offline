import React, { use, useEffect, useRef, useState } from 'react';
import styles from "./PlayBot.module.css";
import DivCard from '../play/componentPlaying/divCard/DivCard';
import { disPatchMethods, playingStore } from '../play/playingRedux/playingStore';
import { useDispatch } from 'react-redux';
import AnimateDivCard from '../play/componentPlaying/animateDivCard/AnimateDivCard';
import { divCard } from '../play/logic.mjs';
import CardsOfPlayers from '../play/componentPlaying/CardsOfPlayers/CardsOfPlayers';
import { playing } from '../play/logic.mjs';
import CardInTable from '../play/componentPlaying/CardInTable/CardInTable';
import Clock from '../play/componentPlaying/clock/Clock';
const Play = ({ players }) => {

    const [myCards, setMyCards] = useState([]);

    const disPatch = useDispatch()

    const playerRefs = useRef([]);

    const rectArr = useRef([])

    const cardDeckRef = useRef(null);

    let [clickDiv, setClickDiv] = useState(false)

    const [divCardMotion, setDivCardMotion] = useState(null);

    const [divDone, setDivDone] = useState(false)


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

        disPatch(disPatchMethods.setRectDeckCard({
            rectCardDeck: {
                x: rectCardDeck.x,
                y: rectCardDeck.y,
                width: rectCardDeck.width,
                height: rectCardDeck.height,
            }
        }));

        const motion = <AnimateDivCard loop={10} rectArr={rectArr.current} rectCardDeck={rectCardDeck} duration={0.01} />

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
            <DivCard disPlay={clickDiv} playerIndex={i} />
        </div>
    ));

    function handleClickDiv() {
        setClickDiv(true)
        let interval2 = setInterval(() => {
            if (playingStore.getState().quantityCardPlayers[playerDivs.length - 1] == 10) {
                disPatch(disPatchMethods.addValueCards({ divCardArr: divCard(players.length) }))
                setMyCards(<CardsOfPlayers />);
                clearInterval(interval2)
                setDivDone(true)
            }
        }, 100)
    }

    useEffect(() => {
        let interval3 = setInterval(() => {
            if (playingStore.getState().quantityCardPlayers[playerDivs.length - 1] == 10) {
                clearInterval(interval3)
            }
        }, 100)
    }, [clickDiv])

    function handleClickPlay() {
        console.log(playingStore.getState().valueCardPlayers[0]);

        const selectedCards = playingStore.getState().selectedCards
        const cardInTable = playingStore.getState().cardInTable
        let selectedCardType = playing.indentifyTypeCards(selectedCards)

        if (!selectedCardType.type) {
            alert("CardType invalid!")
            return
        }
        let check = playing.checkValidPlaying(selectedCards, cardInTable)

        if (!check.state) {
            alert(check.message)
            return
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

    }

    function handleClickSkip() {
        if (!playingStore.getState().cardInTable?.length) {
            alert("your turn!")
            return
        }
        disPatch(disPatchMethods.increSkip())
    }

    return (
        <div className={styles["playContainer"]}>
            <div className={styles["table"]}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    {playerDivs.slice(0, 3)}
                </div>

                {!divDone ? <div className={styles['cardDeck']} ref={cardDeckRef} >
                    {!clickDiv ? <button style={{ height: "30px", width: "80px", marginBottom: "90px" }} onClick={handleClickDiv}>Chia bai</button> : <p />}
                </div> : null}

                {divDone ? <CardInTable /> : null}

                <div style={{ display: "flex" }}>
                    {playerDivs.length > 3 ? playerDivs.slice(3) : <div />}
                </div>
                {clickDiv ? divCardMotion : <p />}

            </div>
            {<button className={styles["fightBtn"]} onClick={handleClickPlay} >Danh bai</button>}

            {<button className={styles["skipBtn"]} onClick={handleClickSkip} >Bo qua</button>}

            {divDone ? myCards : null}
            {divDone ? <Clock time={30} /> : null}


        </div>);
};

export default Play;
