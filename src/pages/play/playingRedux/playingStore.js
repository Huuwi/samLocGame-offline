import { createSlice, configureStore } from "@reduxjs/toolkit"

const quantityCardPlayers = [0, 0, 0, 0, 0, 0]

const valueCardPlayers = [] // [ [], [], [], [], [], [] ]

const selectedCards = []

const movingIndex = -99

const turn = 0

const cardInTable = []

const numberOfPlayers = 0

const rectDeckCard = null

const skip = 0

const slice = createSlice({
    name: "playingSlice",
    initialState: {
        quantityCardPlayers, valueCardPlayers, selectedCards, turn, numberOfPlayers, cardInTable, rectDeckCard, skip
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
        removeCardByIndex: (state, action) => {
            let count = 0
            let { indexArr } = action.payload
            for (let e of indexArr) {
                state.valueCardPlayers[state.turn % state.numberOfPlayers].splice(e - count, 1)
                count++
            }
        },
        removeCardByValue: (state, action) => {
            let { valueArr } = action.payload
            for (let e of valueArr) {
                let cards = state.valueCardPlayers[state.turn % state.numberOfPlayers]
                cards.splice(cards.indexOf(e), 1)
            }
        },
        changeSelectedStatus: (state, action) => {
            let { imageName } = action.payload
            if (state.selectedCards.includes(imageName)) {
                state.selectedCards.splice(state.selectedCards.indexOf(imageName), 1)
            } else {
                state.selectedCards.push(imageName)
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
        },
        changeCard: (state, action) => {
            let { indexFirst, indexSecond } = action.payload;
            let indexPlayer = state.turn % state.numberOfPlayers;

            let cards = state.valueCardPlayers[indexPlayer];

            // Nếu vị trí giống nhau hoặc liền kề sau thì không làm gì
            if (indexFirst === indexSecond || indexSecond === indexFirst + 1) return;

            const [movedCard] = cards.splice(indexSecond, 1); // Lấy và xóa phần tử ở indexSecond
            cards.splice(indexFirst + 1, 0, movedCard);       // Chèn vào sau indexFirst
        },
        updateCardInTable: (state, action) => {
            state.cardInTable = [...state.selectedCards]
        },
        setRectDeckCard: (state, action) => {
            let { rectCardDeck } = action.payload
            state.rectDeckCard = rectCardDeck
        },
        increSkip: (state, action) => {
            state.skip++
            state.selectedCards = []
            if (state.skip == state.numberOfPlayers - 1) {
                state.skip = 0
                state.cardInTable = []
            }
            state.turn++
        }

    }

})

export const disPatchMethods = slice.actions

export const playingStore = configureStore({ reducer: slice.reducer })

