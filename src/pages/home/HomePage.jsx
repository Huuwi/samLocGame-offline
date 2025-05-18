import React from 'react'
import styles from "./HomePage.module.css"
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles["homeContainer"]}>
            <h1>Hello from HomePage</h1>
            <button onClick={() => {
                navigate("/table")
            }} >Choi nguoi voi nguoi</button>
            <button>Choi nguoi voi may</button>
        </div>
    )
}

export default HomePage
