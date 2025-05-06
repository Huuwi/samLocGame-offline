// initial value

let cardDefine = [
    { name: '2_of_', value: 15, },
    { name: '3_of_', value: 3, },
    { name: '4_of_', value: 4, },
    { name: '5_of_', value: 5, },
    { name: '6_of_', value: 6, },
    { name: '7_of_', value: 7, },
    { name: '8_of_', value: 8, },
    { name: '9_of_', value: 9, },
    { name: '10_of_', value: 10, },
    { name: 'jack_of_', value: 11, },
    { name: 'queen_of_', value: 12, },
    { name: 'king_of_', value: 13, },
    { name: 'ace_of_', value: 14, }
]

let cardTypes = ["clubs.png", "diamonds.png", "hearts.png", "spades.png"]

let cards = []


for (let m of cardDefine) {
    for (let n of cardTypes) {
        cards.push(m.name + n)
    }
}

//export methods

function getCardMap() {
    const nameMap = new Map(cardDefine.map(card => [card.name, card.value]));
    let cardMap = new Map()
    for (let e of cards) {
        let firstName = e.replace("clubs.png", "").replace("diamonds.png", "").replace("hearts.png", "").replace("spades.png", "")
        cardMap.set(e, nameMap.get(firstName))
    }
    return cardMap
}
export const cardMap = getCardMap()

function mixCard() {
    let copyCards = [...cards]
    let mixArr = []

    while (copyCards.length > 1) {
        let index = Math.floor(Math.random() * copyCards.length)
        mixArr.push(copyCards[index])
        copyCards.splice(index, 1)
    }

    return mixArr
}


export function divCard(numberOfPlayers = 2) {
    let mix = mixCard()
    let res = []
    for (let i = 0; i < numberOfPlayers; i++) {
        res.push([])
    }
    for (let i = 0; i < numberOfPlayers * 10; i++) {
        let playerIndex = i % numberOfPlayers
        res[playerIndex].push(mix[i])
    }
    return res
}





