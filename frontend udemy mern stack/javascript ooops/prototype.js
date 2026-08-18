let computer={cpu:12}
let lenovo={screen:"Hd",
    __proto__:computer
}
let tomhardware={}

// console.log(`lenevo`,lenovo.__proto__)


let genericcar={tyres:4}
let tesla={
    driver:"Ai"
}
Object.setPrototypeOf(tesla,genericcar)

console.log(`tesla`,tesla.tyres)

console.log(`tesla`,Object.getPrototypeOf(tesla))