
const checkStraight = (n) => {

    let numbers = [...n]
    let rest = 0
    if (numbers.includes(15) && numbers.includes(3) && numbers.includes(14)) {
        numbers.splice(numbers.length - 2, 2)
        rest = 26
    }
    if (numbers.includes(15) && numbers.includes(3)) {
        numbers.splice(numbers.length - 1, 1)
        rest = 13
    }
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] + 1 != numbers[i + 1]) {
            return {
                state: false
            }
        }
    }
    return {
        state: true,
        rest
    }
}

const checkDuplicate = (numbers) => {

    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] != numbers[i + 1]) {
            return 0
        }
    }
    return numbers.length
}


const helper = {
    checkStraight,
    checkDuplicate
}


export default helper
