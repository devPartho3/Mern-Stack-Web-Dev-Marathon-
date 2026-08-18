let tcollection=["coffeetea", "blacktea", "masalachai", "oolongtea"]
let availabletea=[]

tcollection.forEach(function (tea){
 if(tea==="masalachai"){
    return
 }   
 availabletea.push(tea)
})
// console.log(availabletea) 

let myteas=["coffeetea", "blacktea", "masalachai", "oolongtea"]
let shortteas=[]

for(const tea of myteas){
    if(tea.length>=10){
        break
    }
    shortteas.push(tea)
}
console.log(shortteas)

