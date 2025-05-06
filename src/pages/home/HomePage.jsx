import React from 'react'
import styles from "./HomePage.module.css"
import { motion } from 'framer-motion'
import { useState } from 'react'

const HomePage = () => {


    return (
        <div className={styles["homeContainer"]}>
            <h1>Hello from HomePage</h1>
            <button>Ready to play?</button>
        </div>
    )
}

export default HomePage
