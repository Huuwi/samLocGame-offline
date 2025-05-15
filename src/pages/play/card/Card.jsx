import React, { useRef } from 'react';
import styles from "./Card.module.css";
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { disPatchMethods, playingStore } from '../playingRedux/playingStore';
import { useSelector, useDispatch } from 'react-redux';

const Card = ({ imageName, cardRects, cardIndex }) => {

    const rectCardDeck = playingStore.getState().rectDeckCard

    const dispatch = useDispatch();
    const selectedCards = useSelector((state) => state.selectedCards);
    const imageFolder = "../../../public/cardImages/";

    // Sử dụng useSpring để tạo hiệu ứng mượt mà
    const x = useSpring(0, { stiffness: 300, damping: 30 });
    const y = useSpring(0, { stiffness: 300, damping: 30 });

    const [backClose, setBackClose] = React.useState(true);
    const [imgClose, setImgClose] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [dragOnTable, setDragOnTable] = React.useState(false);

    const isDragging = useRef(false);
    const dur = 0.15;

    const handleClickOpen = () => {
        if (isDragging.current) return;

        if (backClose) {
            setBackClose(false);
            setTimeout(() => {
                setImgClose(true);
                setTimeout(() => {
                    setIsOpen(true);
                }, 0);
            }, dur * 1000);
            return;
        }

        dispatch(disPatchMethods.changeSelectedStatus({ imageName }));
    };

    const handleDragEndCard = (event, info) => {
        event.preventDefault();
        isDragging.current = false;

        if (backClose) return;

        if (info.offset.y < -400 || info.offset.y > 400) {
            x.set(0);
            y.set(0);
            return;
        }
        let index = cardIndex
        for (let i = 0; i < cardRects.length; i++) {
            if (cardRects[i].x > info.point.x) {
                index = i - 1
                break
            }
        }
        x.set(0);
        y.set(0);

        dispatch(disPatchMethods.changeCard({ indexFirst: index, indexSecond: cardIndex }))
    };

    function handleDragging(event, info) {
        isDragging.current = true;
    }


    return (
        <motion.div
            className={styles["cardContainer"]}
            style={{
                marginTop: selectedCards.includes(imageName) ? "-150px" : "0px",
            }}
        >
            {!isOpen && (
                <motion.img
                    onClick={handleClickOpen}
                    className={styles['img2']}
                    src={`${imageFolder}backCard.png`}
                    animate={{ rotateY: !backClose ? 90 : 0 }}
                    transition={{
                        rotateY: { duration: dur },
                        ease: "easeOut",
                    }}
                    initial={{ rotateY: backClose ? 0 : 90 }}
                />
            )}

            <motion.img
                style={{ x, y, position: "absolute" }}
                onClick={handleClickOpen}
                drag
                dragMomentum={false}
                // dragElastic={0.2} // Tạo cảm giác kéo tự nhiên
                onDragStart={handleDragging}
                onDragEnd={handleDragEndCard}
                className={styles['img1']}
                src={`./public/cardImages/${imageName}`}
                animate={{
                    rotateY: !imgClose ? 90 : 0,
                    scale: dragOnTable ? 0.8 : 1,
                    // top: rectCardDeck.top,
                    // left: rectCardDeck.left
                }}
                transition={{
                    rotateY: { duration: dur },
                    scale: { duration: 0.3 },
                }}
                initial={{
                    rotateY: imgClose ? 0 : 90,
                    x: 0,
                    y: 0,
                }}
            />
        </motion.div>
    );
};

export default Card;