let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // index 3 , 8
let b = [0, 1, 2, 8, 3, 4, 5, 6, 7, 9, 10]
function tranform(indexFirst, indexSecond) {
    let saveValue = a[indexFirst]
    a[indexFirst] = a[indexSecond]
    for (let i = indexSecond; i > indexFirst + 1; i--) {
        a[i] = a[i - 1]
    }
    a[indexFirst + 1] = saveValue
}
tranform(3, 8)

console.log(a);



