document.addEventListener("DOMContentLoaded",()=>{
     const products=[
        {id:1,name:"product1",price:29.99},
        {id:2,name:"product2",price:19.99},
        {id:3,name:"product3",price:59.99}
     ]

const cart=[]



const productlist=document.getElementById("product-list")
const cartitems=document.getElementById("cart-items")
const emptycartmsg=document.getElementById("empty-cart")
const totalpricedisplay=document.getElementById("total-price")
const checkoutbtn=document.getElementById("checkout-btn")


products.forEach(product=>{
    const productdiv=document.createElement("div")
    productdiv.classList.add("product")
    productdiv.innerHTML=`
    <span>${product.name}-$${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>`
    productlist.appendChild(productdiv)
})
 
productlist.addEventListener("click",(e)=>{
    if(e.target.tagName==="button"){
      const productid= parseInt (e.target.getAttribute("data-id"))
      products.find(p=>{
        p.id===productid
      })
      addtocart(productid)
    }
})

function addtocart(product){
    cart.push(product)
    rendercart()

}
function rendercart(){
    cartitems.innerHTML=""
    let totalprice=0

    if(cart.length>0){
emptycartmsg.classList.add("hidden")
carttotalmsg.classList.remove("hidden")
cart.forEach((item,index)=>{
totalprice+=item.price
const cartitem=document.createElement("div")
cartitems.innerHTML=`
${item.name}-${item.price.toFixed(2)}`

cartitems.appendChild(cartitem)
})
    }
    else
    {
        emptycartmsg.classList.remove("hidden")
        
    }
}
})