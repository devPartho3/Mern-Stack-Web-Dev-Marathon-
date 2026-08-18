function maketea(typeofteas)
{
    `maketea:${typeofteas}`
}
function processteaorder(teaFunction)
{
    return teaFunction("earl grey")
}
let order=processteaorder(maketea)
// console.log(order)


function createtea(){
    return function(teatype){
        return `making ${teatype}`
    }
}
let teamaker=createtea()
let result=teamaker("greentea")
console.log(result)