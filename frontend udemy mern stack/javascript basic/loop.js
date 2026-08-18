let teas = ["coffeetea", "blacktea", "masalachai", "oolongtea"]
let selectedtea = []

for (let i = 0; i < teas.length; i++) {
    if (teas[i] === "masalachai") {
        break
    }
    selectedtea.push(teas[i])
}

// console.log(selectedtea)


let numbers = [1, 2, 3, 4, 5]
let snumbers = []

for (const num of numbers) {
    if (num === 4) {
        break
    }
    snumbers.push(numbers)
}

// console.log(snumbers)

let teatypes = ["coffeetea", "blacktea", "masalachai", "oolongtea"]
let Stea = []

for (const tea of teatypes) {
    if (tea === "blacktea") {
        continue
    }
    {
        Stea.push(tea)
    }
}
// console.log(Stea)

