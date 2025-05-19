import { Bot } from "./src/pages/play/bot.mjs"

let a = [
    { card: '6_of_hearts.png', value: 6 },
    { card: '7_of_clubs.png', value: 7 },
    { card: '8_of_clubs.png', value: 8 },
    { card: 'jack_of_hearts.png', value: 11 },
    { card: 'queen_of_diamonds.png', value: 12 },
    { card: 'queen_of_clubs.png', value: 12 },
    { card: 'king_of_hearts.png', value: 13 },
    { card: 'ace_of_diamonds.png', value: 14 },
    { card: '2_of_hearts.png', value: 15 },
    { card: '2_of_spades.png', value: 15 }
]
const myBot = new Bot(a.map((e) => { return e.card }), 2)

console.log(myBot.cardsOfBot)

console.log(myBot.mixCard().map((e) => { return e.cards }));


console.log(myBot.responsePlayer({
    type: "Straight",
    length: 4,
    value: 0
}));



