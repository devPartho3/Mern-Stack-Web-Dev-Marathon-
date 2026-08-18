let citiespopulation={
    "London":600000,
    "paris":650000,
    "berlin":570000,
    "eindhoven":250000,
    "den haag":350000
}
let citypopulation=[]
// console.log(Object.keys(citiespopulation))

for(const city in citiespopulation){
    if(city==="berlin"){
        break
    }
    // console.log(citiespopulation[city])
    citypopulation[city]=citiespopulation[city]
}
// console.log(citypopulation)
 

let tcollection=["coffeetea", "blacktea", "masalachai", "oolongtea"]
let availabletea=[]

tcollection.forEach(function (tea){
 if(tea==="masalachai"){
    return
 }   
 availabletea.push(tea)
})
console.log(availabletea)





