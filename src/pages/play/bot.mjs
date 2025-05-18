import { playing, cardMap, cards } from "./logic.mjs"


function randomNElement(arr0, n) {
    let arr = [...arr0]
    const res = []
    for (let i = 0; i < n; i++) {
        const rIndex = Math.floor(Math.random() * arr.length)
        res.push(arr[rIndex])
        arr.splice(rIndex, 1)
    }
    return res
}


export class Bot {

    numCardPlayed
    cardsOfBot


    constructor(cardsOfPlayers, level) {

        const restCards = [...cards]

        for (let e of cardsOfPlayers) {
            restCards.splice(restCards.indexOf(e), 1)
        }
        this.cardsOfBot = []
        this.numCardPlayed = 0

        switch (level) {
            case 1:
                this.cardsOfBot = randomNElement(restCards, 10).map((e) => {
                    return {
                        card: e,
                        value: cardMap.get(e)
                    }
                })
                break;

            case 2:
                this.cardsOfBot = randomNElement(restCards, 10).map((e) => {
                    return {
                        card: e,
                        value: cardMap.get(e)
                    }
                })
                break;

            case 3:
                this.cardsOfBot = restCards.map((e) => {
                    return {
                        card: e,
                        value: cardMap.get(e)
                    }
                })
                break;

            default:
                break;
        }
        this.cardsOfBot.sort((a, b) => { return a.value - b.value })
        console.log(this.cardsOfBot);

    }



    mixCard() {
        const mixCardArr = []

        for (let i = 0; i < this.cardsOfBot.length - 1; i++) {
            let dupFlag = false
            let straightFlag = false

            let preValue = this.cardsOfBot[i]
            let curArrStraight = [preValue]
            let countDuplicate = 1


            for (let j = i + 1; j < this.cardsOfBot.length; j++) {

                //checkStraight
                if (!straightFlag) {

                    if (preValue.value + 1 != this.cardsOfBot[j].value) {
                        if (preValue.value != this.cardsOfBot[j].value) {
                            straightFlag = true
                            curArrStraight = []
                        }
                    } else {
                        curArrStraight.push(this.cardsOfBot[j])
                        if (curArrStraight.length >= 3) {
                            let saveCur = [...curArrStraight]
                            mixCardArr.push({
                                type: "Straight",
                                cards: saveCur,
                                value: saveCur.reduce((pre, cur) => pre + cur.value, 0),
                                length: saveCur.length
                            })
                        }
                        preValue = this.cardsOfBot[j]
                    }
                }

                //checkduplicate

                if (!dupFlag) {

                    if (this.cardsOfBot[i].value == this.cardsOfBot[j].value) {
                        countDuplicate++
                        switch (countDuplicate) {
                            case 2:
                                mixCardArr.push({
                                    type: "Pair",
                                    value: this.cardsOfBot[i].value * 2,
                                    cards: [this.cardsOfBot[i], this.cardsOfBot[i + 1]]
                                })
                                break;

                            case 3:
                                mixCardArr.push({
                                    type: "Three of a Kind",
                                    value: this.cardsOfBot.value * 3,
                                    cards: [this.cardsOfBot[i], this.cardsOfBot[i + 1], this.cardsOfBot[i + 2]]

                                })

                            case 4:
                                mixCardArr.push({
                                    type: "Four of a Kind",
                                    value: this.cardsOfBot.value * 3,
                                    cards: [this.cardsOfBot[i], this.cardsOfBot[i + 1], this.cardsOfBot[i + 2], sortedMapArr[i + 3]]
                                })

                            default:
                                break;
                        }
                    } else {
                        dupFlag = true
                    }

                }

            }
        }

        return mixCardArr

    }

    responsePlayer(cardInTable) {
        let { length, value, type } = cardInTable

    }





}



