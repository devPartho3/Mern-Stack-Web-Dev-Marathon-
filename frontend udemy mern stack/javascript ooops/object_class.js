let car={
    make:"toyota",
    model:"camron",
    year:2020,
    start: function(){
        return `${this.make}car got started in ${this.year}`
    }
}
// let Mycar=new car
// console.log(car.start())


class Vehicle{
    constructor(make,model){
        this.make=make
        this.model=model
    }
    start(){
        return `${this.model} is a car from ${this.make}`
    }
}

class Car extends Vehicle{
    drive(){
        return`${this.make}:inheritence`
    }
}

let Mycar=new Car("toyota","corola")

// console.log(Mycar.start())
// console.log(Mycar.drive())