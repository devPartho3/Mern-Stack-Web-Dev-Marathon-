function maketea(typeoftea)
{
    return `Making ${typeoftea}`
} 
let greet=maketea("lemon tea")
// console.log(greet)


function ordertea(teatype){
    function confirmorder(){
        return `Order confirmed for chai`
    }
    return confirmorder()
}

let orderconfirmation=ordertea("chai")

// console.log(orderconfirmation)

//Arrow FUnction

const calculatetotal=(price,quantity)=>{
    return price*quantity
}
let totalcost=calculatetotal(499,1200)
// console.log(totalcost)