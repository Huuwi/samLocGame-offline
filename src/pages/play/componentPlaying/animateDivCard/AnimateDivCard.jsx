import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { disPatchMethods } from '../../playingRedux/playingStore';

const AnimateDivCard = ({ loop, rectArr, rectCardDeck, duration, cbr }) => {
    const [motions, setMotions] = useState([]);
    const divIndex = useRef(0);

    const dispatch = useDispatch()

    useEffect(() => {
        const totalCards = loop * rectArr.length;

        const interval = setInterval(() => {
            if (divIndex.current >= totalCards) {
                clearInterval(interval);
                return;
            }

            const targetIndex = divIndex.current % rectArr.length;
            const rect = rectArr[targetIndex];

            // console.log("rectDeck : ", rect.top);

            dispatch(disPatchMethods.addQuantity({ index: targetIndex, quantity: 1 }))

            const newMotion = (
                <motion.div
                    key={divIndex.current}
                    style={{
                        backgroundImage: `url("/cardImages/backCard.png")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                        height: "100px",
                        width: "60px",
                        position: "fixed",
                        zIndex: 10
                    }}
                    initial={{
                        opacity: 1,
                        top: rectCardDeck.top,
                        left: rectCardDeck.left,
                        height: rectCardDeck.height,
                        width: rectCardDeck.width
                    }}
                    animate={{
                        opacity: 0,
                        top: rect.top,
                        left: rect.left,
                        height: rect.height,
                        width: rect.width
                    }}
                    transition={{
                        opacity: { duration },
                        top: { duration },
                        left: { duration }
                    }}
                />
            );

            setMotions((prev) => [...prev, newMotion]);
            divIndex.current += 1;
        }, duration * 1000);

        return () => clearInterval(interval);
    }, [loop, rectArr, rectCardDeck, duration]);
    return <>{motions}</>;
};

export default AnimateDivCard;
