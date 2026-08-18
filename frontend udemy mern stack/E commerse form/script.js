document.addEventListener("DOMContentLoaded", () => {
    let products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 39.99 }
    ]


    let cart = []
    let productlist = document.getElementById("product-list")
    let cartitems = document.getElementById("cart-items")
    let emptycartmsg = document.getElementById("empty-cart")
    let carttotalmsg = document.getElementById("cart-total")
    let totalpricedisplay = document.getElementById("total-price")
    let checkoutbtn = document.getElementById("checkout-btn")




    products.forEach(product => {
        let productdiv = document.createElement("div")
        productdiv.classList.add("product")
        productdiv.innerHTML = `
        <span>${product.name}--$${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add To Cart!</button>
        `
        productlist.appendChild(productdiv)
    })


    productlist.addEventListener(`click`, (e) => {
        if (e.target.tagName === "BUTTON") {
            console.log("clicked");
            let productid = parseInt(e.target.getAttribute("data-id"))
            products.find((p) => p.id === productid)



            function addtocart(products) {

                cart.push(products)
                console.log(cart);
                rendercart()

            }
        }

        function rendercart() {
            cartitems.innerHTML = ""

            let totalprice = 0

            if (cart.length > 0) {
                emptycartmsg.classList.add("hidden")
                carttotalmsg.classList.remove("hidden")
                cart.forEach((item, index) => {
                    totalprice += item.price
                    let cartitem = document.createElement("div")
                    cartitem.innerHTML = `
                    ${item.name}--$${item.price.toFixed(2)}
                    `

                    cartitems.appendChild("cartitem")



                    totalpricedisplay.textContent = `${totalprice.toFixed(2)}`
                })

            } else {
                emptycartmsg.classList.remove("hidden");
                totalpricedisplay.textContent = `$0.00`;
            }
        }

        checkoutbtn.addEventListener("click", () => {
            cart.length = 0;
            alert("Checkout successfully");
            rendercart();
          });


    })





})