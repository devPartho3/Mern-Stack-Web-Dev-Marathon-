function Person(name){
    this.name=name
}
Person.prototype.greet=function(){
    console.log(`hallo, My name is ${this.name}`)
}
let Partho=new Person("Dev")
Partho.greet()