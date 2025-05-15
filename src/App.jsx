import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import HomePage from '@/pages/home/HomePage.jsx'
import Card from './pages/play/card/Card'
import Play from './pages/play/Play'

const App = () => {

  // let demoPlayers = [
  //   { name: "nguyenHuuDuc", img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi2haw1278i40sszGwCvy7LKP3j2KqLTnPJg&s' }, { name: "nguyenHuuHa", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKYH4sR1-krNloWi-Iq94f-SSB09BSGlHJVA&s" }, { name: "phamThiHanh", img: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740" }, { name: "phamThiHanh", img: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740" }
  // ]

  let demoPlayers = [
    { name: "phamThiHanh", img: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740" }, { name: "phamThiHanh", img: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740" }
  ]

  return (
    <Routes>
      <Route path='/' element={<Card imgPath={'king_of_hearts.png'} />} />
      <Route path='/table' element={<Play players={demoPlayers} />} />

    </Routes>

  )
}

export default App
