import React from 'react'
import styles from "./CardInTable.module.css"
import { useSelector } from 'react-redux'

const CardInTable = () => {
    const cardInTable = useSelector((state) => state.cardInTable)

    return (
        <div style={{ display: "flex", gap: "15px", alignItems: "center", justifyContent: "center" }}>
            {cardInTable.map((e, i) => (
                <img
                    src={`/cardImages/${e}`}
                    key={i}
                    alt={`Card ${i}`}
                    style={{
                        height: "120px",
                        width: "70px",
                        backgroundImage: 'url("/cardImages/back.png")'

                    }}
                />
            ))}
        </div>
    )
}

export default CardInTable
