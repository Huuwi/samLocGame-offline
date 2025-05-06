import { createSlice, configureStore } from "@reduxjs/toolkit"
import { cardMap } from "../logic.mjs"

const quantityCardPlayers = [0, 0, 0, 0, 0, 0]

const valueCardPlayers = [] // [ [], [], [], [], [], [] ]

const selectedCards = []

const movingIndex = -99

const turn = 0

const cardInTable = []

const numberOfPlayers = 0

const slice = createSlice({
    name: "playingSlice",
    initialState: {
        quantityCardPlayers, valueCardPlayers, selectedCards, turn, numberOfPlayers, cardInTable
    },
    reducers: {
        addQuantity: (state, action) => {
            let { index, quantity } = action.payload // get index of each player
            state.quantityCardPlayers[index] += quantity
        },
        removeQuantiy: (state, action) => {
            let { index, quantity } = action.payload
            state.quantityCardPlayers[index] -= quantity
        },
        addValueCards: (state, action) => {
            let { divCardArr } = action.payload
            for (let i = 0; i < divCardArr.length; i++) {
                state.valueCardPlayers[i] = divCardArr[i]
            }
        },
        addSelectedCards: (state, action) => {

        },
        increTurn: (state, action) => {
            state.turn++
        },
        changePosition: (state, action) => {
            let { first, second } = action.payload
            let valueFirst = state.valueCardPlayers[state.turn % state.numberOfPlayers][first]
            state.valueCardPlayers[state.turn % state.numberOfPlayers][first] = state.valueCardPlayers[state.turn % state.numberOfPlayers][second]
            state.valueCardPlayers[state.turn % state.numberOfPlayers][second] = valueFirst
        },
        changeNumberOfplayer: (state, action) => {
            let { numberOfPlayers } = action.payload
            state.numberOfPlayers = numberOfPlayers
        },
        removeCard: (state, action) => {
            let count = 0
            let { indexArr } = action.payload
            for (let e of indexArr) {
                state.valueCardPlayers[state.turn % state.numberOfPlayers].splice(e - count, 1)
                count++
            }
        },
        changeSelectedStatus: (state, action) => {
            let { cardIndex } = action.payload
            if (state.selectedCards.includes(cardIndex)) {
                state.selectedCards.splice(state.selectedCards.indexOf(cardIndex), 1)
            } else {
                state.selectedCards.push(cardIndex)
            }
        },
        clearSelectedStatus: (state, action) => {
            state.selectedCards = []
        },
        clearTable: (state, action) => {
            state.cardInTable = []
        },
        addCardToTable: (state, action) => {
            let { indexArr } = action.payload
            for (let e of indexArr) {
                state.cardInTable.push()
            }
        }
    }

})

export const disPatchMethods = slice.actions

export const playingStore = configureStore({ reducer: slice.reducer })

