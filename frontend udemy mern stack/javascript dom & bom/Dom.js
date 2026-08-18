//example1
let hold=document.getElementById(`changetextbutton`).addEventListener(`click`,function (){
    let paragraph= document.getElementById(`Mypara`)
    console.log(paragraph)
    paragraph.textContent="The Paragraph Is Changed"
})

//example2
document.getElementById("highlightfirstcity").addEventListener("click",function(){
    let citylist=document.getElementById("citylist")
    citylist.firstElementChild.classList.add("highlight")
})

//example3
document.getElementById("changeorder").addEventListener("click",function(){
    let Coffee=document.getElementById("coffeetype")
    Coffee.textContent="Espresso!!!"
    Coffee.style.padding="5px"
    Coffee.style.backgroundColor="Grey"

})

//example4

document.getElementById("addNewItem").addEventListener("click",function(){
    let newitem=document.createElement("li")
    newitem.textContent="Eggs"

    document.getElementById("shoppinglist").appendChild(newitem)
    newitem.style.backgroundColor="purple"
})

//example5

document.getElementById("remove").addEventListener("click",function(){
    let tasklist=document.getElementById("tasklist")
    tasklist.lastElementChild.remove()

})

//example6

document.getElementById("click").addEventListener("click",function(){
    alert("COffeCode!!!")
})
 

//example7

document.getElementById("tealist").addEventListener("click",function(event){
    if(event.target&&event.target.matches(".teaitem")){
        alert("YOU Selected:"+event.target.textContent)
    } 
    // console.log(event.target)
})

//example8

document.getElementById("feedback").addEventListener("submit",function(event){
    alert("Submitted!")
    event.preventDefault()
    let feedback=document.getElementById("input").value
    console.log(feedback)
    document.getElementById("display")
    this.textContent=`feedback is:${feedback}`
})


//example9
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("domstatus").textContent="Dom FUlly Loaded!"
    alert("DOM SAYS HALLOOO!")
})


//example10
document.getElementById("togglehighlight").addEventListener("click",function(){
    let text=document.getElementById("description")
    text.classList.toggle("highlight")
})