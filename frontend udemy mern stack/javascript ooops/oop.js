//Encapsulation
class Bankaccount {
    #balance = 1200
    deposit(amount) {
        this.#balance += amount
        return this.#balance
    }
    getbalance() {
        return `${this.#balance}`
    }
}

let account = new Bankaccount()
// console.log(account.getbalance())

//Abstraction

class Bird {
    fly() {
        return `flying`
    }
}
class Penguin extends Bird {
    fly() {
        return `penguins cant fly`
    }
}
let bird = new Bird
let penguins = new Penguin

//   console.log(bird.fly())
//   console.log(penguins.fly())

//Getters & setters

class Employee {
    constructor(name, salary) {
        if(salary<0){
            throw new error("invalid")
        }
        this.name = name
        this._salary = salary
    }

    get salary() {
        return `not allowed to see`
    }

    set salary(value) {
        if (value < 0) {
            console.error("invalid salary")
        } else {
            this.salary = value
        }
    }
}
let employee = new Employee("dev", 50000)
console.log(employee.salary)