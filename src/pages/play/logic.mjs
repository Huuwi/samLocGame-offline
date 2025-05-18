import helper from "./helper.mjs"

// initial value

let cardDefine = [
    { name: '2_of_', value: 16, },
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

export let cards = []


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

export const playing = {
    indentifyTypeCards(selectedCards) {
        if (!selectedCards.length) {
            return {
                type: null,
                value: null
            }
        }
        let valueArr = selectedCards.map((e) => {
            return cardMap.get(e)
        })

        let totalValue = valueArr.reduce((pre, cur) => pre + cur, 0);

        valueArr = valueArr.sort((a, b) => a - b);

        if (selectedCards.length == 1) {
            return {
                type: "Single",
                value: cardMap.get(selectedCards[0])
            }
        }

        if (selectedCards.length >= 2 && selectedCards.length <= 4) {

            let checkDuplicate = helper.checkDuplicate(valueArr)

            switch (checkDuplicate) {
                case 0:
                    break;
                case 2:
                    return {
                        type: "Pair",
                        value: totalValue
                    }
                case 3:
                    return {
                        type: "Three of a Kind",
                        value: totalValue
                    }

                case 4:
                    return {
                        type: "Four of a Kind",
                        value: totalValue
                    }

                default:
                    break;
            }
        }

        if (selectedCards.length >= 3) {
            let checkStraight = helper.checkStraight(valueArr)

            if (checkStraight.state) {
                let newValue = checkStraight.rest ? totalValue - checkStraight.rest : totalValue
                return {
                    type: "Straight",
                    value: newValue
                }
            }
        }
        return {
            type: null,
            value: null
        }

    },

    checkValidPlaying(selectedCards, cardInTable) {

        if (!cardInTable?.length) {
            return {
                state: true,
                message: "valid"
            }
        }

        if (selectedCards?.length != cardInTable?.length) {
            return {
                state: false,
                message: "length invalid!"
            }
        }
        const v1 = this.indentifyTypeCards(selectedCards)
        const v2 = this.indentifyTypeCards(cardInTable)

        if (v1.type != v2.type) {
            return {
                state: false,
                message: "type invalid!"
            }
        }

        if (v1.value <= v2.value) {
            return {
                state: false,
                message: "value card invalid!"
            }
        }

        return {
            state: true,
            message: "valid"
        }
    }



}



