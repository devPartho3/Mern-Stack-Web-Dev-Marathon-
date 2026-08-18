const Person={
    name:"Dev",
    greet(){
        console.log(`Hi I am ${this.name}`)
    }
}
Person.greet()

const greetfunction=Person.greet()
// greetfunction()  

const boundgreet=Person.greet.bind({name:"Dev"})
boundgreet()