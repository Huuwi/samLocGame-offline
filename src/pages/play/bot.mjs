import { playing, cardMap, cards } from "./logic.mjs";

function randomNElement(arr0, n) {
    let arr = [...arr0];
    const res = [];
    for (let i = 0; i < n; i++) {
        const rIndex = Math.floor(Math.random() * arr.length);
        res.push(arr[rIndex]);
        arr.splice(rIndex, 1);
    }
    return res;
}

function findCardCanPlay({ length, value, type }, mixedCards) {
    if (type === "Straight") {
        return mixedCards.filter(
            (e) => e.type === type && e.value > value && e.length === length
        );
    }
    return mixedCards.filter((e) => e.type === type && e.value > value);
}

function responseSingleType(value, mixedCards, cardsOfBot) {
    let cob = cardsOfBot.map((e) => ({
        prio: 0,
        ...e,
    }));

    let mc = [...mixedCards];
    let cs = mc.map((e) => ({
        cards: e.cards.map((el) => el.card),
        type: e.type,
    }));

    for (let i = 0; i < cob.length; i++) {
        for (let e of cs) {
            if (e.cards.includes(cob[i].card)) {
                if (
                    e.cards.length > 3 &&
                    e.type === "Straight" &&
                    (cob[i].card === e.cards[0] || cob[i].card === e.cards[e.cards.length - 1])
                ) {
                    cob[i].prio -= 1;
                } else {
                    cob[i].prio -= 2;
                }
            }
        }
    }

    cob.sort((a, b) => a.prio - b.prio);

    let minCard =
        cob
            .filter((e) => e.prio === cob[cob.length - 1].prio && e.value > value)
            .sort((a, b) => a.value - b.value)[0] || null;

    return minCard;
}

function responseRestType(canPlayCards, mixedCards) {
    let mc = [...mixedCards];
    let cpl = canPlayCards.map((e) => ({
        prio: 0,
        ...e,
    }));

    let cs = mc.map((e) => ({
        cards: e.cards.map((el) => el.card),
        type: e.type,
    }));

    for (let i = 0; i < cpl.length; i++) {
        for (let k of cpl[i].cards) {
            for (let e of cs) {
                if (e.cards.includes(k.card)) {
                    if (
                        e.cards.length > 3 &&
                        e.type === "Straight" &&
                        (k.card === e.cards[0] || k.card === e.cards[e.cards.length - 1])
                    ) {
                        cpl[i].prio -= 1;
                    } else {
                        cpl[i].prio -= 2;
                    }
                }
            }
        }
    }

    cpl.sort((a, b) => a.prio - b.prio);

    let minCard =
        cpl
            .filter((e) => e.prio === cpl[cpl.length - 1].prio)
            .sort((a, b) => a.value - b.value)[0] || null;

    return minCard;
}

export class Bot {
    numCardPlayed;
    cardsOfBot;

    constructor(cardsOfPlayers, level) {
        const restCards = [...cards];

        for (let e of cardsOfPlayers) {
            restCards.splice(restCards.indexOf(e), 1);
        }

        this.cardsOfBot = [];
        this.numCardPlayed = 0;

        switch (level) {
            case 1:
                this.cardsOfBot = randomNElement(restCards, 10).map((e) => ({
                    card: e,
                    value: cardMap.get(e),
                }));
                break;
            case 2:
                this.cardsOfBot = randomNElement(restCards, 20).map((e) => ({
                    card: e,
                    value: cardMap.get(e),
                }));
                break;
            case 3:
                this.cardsOfBot = restCards.map((e) => ({
                    card: e,
                    value: cardMap.get(e),
                }));
                break;
            default:
                break;
        }

        this.cardsOfBot.sort((a, b) => a.value - b.value);
    }

    mixCard() {
        const mixCardArr = [];

        for (let i = 0; i < this.cardsOfBot.length - 1; i++) {
            let dupFlag = false;
            let straightFlag = false;

            let preValue = this.cardsOfBot[i];
            let curArrStraight = [preValue];
            let countDuplicate = 1;

            for (let j = i + 1; j < this.cardsOfBot.length; j++) {
                // Check Straight
                if (!straightFlag) {
                    if (preValue.value + 1 !== this.cardsOfBot[j].value) {
                        if (preValue.value !== this.cardsOfBot[j].value) {
                            straightFlag = true;
                            curArrStraight = [];
                        }
                    } else {
                        curArrStraight.push(this.cardsOfBot[j]);
                        if (curArrStraight.length >= 3) {
                            let saveCur = [...curArrStraight];
                            mixCardArr.push({
                                type: "Straight",
                                cards: saveCur,
                                value: saveCur.reduce((pre, cur) => pre + cur.value, 0),
                                length: saveCur.length,
                            });
                        }
                        preValue = this.cardsOfBot[j];
                    }
                }

                // Check Duplicate
                if (!dupFlag) {
                    if (this.cardsOfBot[i].value === this.cardsOfBot[j].value) {
                        countDuplicate++;
                        switch (countDuplicate) {
                            case 2:
                                mixCardArr.push({
                                    type: "Pair",
                                    value: this.cardsOfBot[i].value * 2,
                                    cards: [this.cardsOfBot[i], this.cardsOfBot[i + 1]],
                                });
                                break;
                            case 3:
                                mixCardArr.push({
                                    type: "Three of a Kind",
                                    value: this.cardsOfBot[i].value * 3,
                                    cards: [
                                        this.cardsOfBot[i],
                                        this.cardsOfBot[i + 1],
                                        this.cardsOfBot[i + 2],
                                    ],
                                });
                                break;
                            case 4:
                                mixCardArr.push({
                                    type: "Four of a Kind",
                                    value: this.cardsOfBot[i].value * 4,
                                    cards: [
                                        this.cardsOfBot[i],
                                        this.cardsOfBot[i + 1],
                                        this.cardsOfBot[i + 2],
                                        this.cardsOfBot[i + 3],
                                    ],
                                });
                                break;
                            default:
                                break;
                        }
                    } else {
                        countDuplicate = 0;
                        dupFlag = true;
                    }
                }
            }
        }

        return mixCardArr;
    }

    responsePlayer(cardInTable) {
        const mixedCards = this.mixCard();
        let { length, value, type } = cardInTable;
        let choose = null;

        let canPlayCards = findCardCanPlay(cardInTable, mixedCards);

        switch (type) {
            case "Single":
                let singleChoose = responseSingleType(value, mixedCards, this.cardsOfBot);
                if (singleChoose) {
                    choose = {
                        type,
                        value: singleChoose?.value || null,
                        cards: [singleChoose?.card || null],
                        length,
                    };
                }
                break;
            default:
                let restChoose = responseRestType(canPlayCards, mixedCards);
                if (restChoose) {
                    choose = {
                        type,
                        value: restChoose?.value || null,
                        cards: restChoose?.cards || null,
                        length,
                    };
                }
                break;
        }

        return choose;
    }
}
