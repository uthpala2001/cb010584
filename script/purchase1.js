let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Golden neckless',
        tag: 'neckless',
        price: 195000,
        inCart: 0
    },
    {
        name: 'Golden diamond ring',
        tag: 'ring',
        price: 49999,
        inCart: 0  
    },
    {
        name: 'Hair assesories',
        tag: 'scrunchy',
        price: 190,
        inCart: 0
    },
    {
        name: 'Hair assesories',
        tag: 'hair band',
        price: 380,
        inCart: 0
    },
    {
        name: 'Traditional mask',
        tag: 'mask',
        price: 5050,
        inCart: 0
    },
    {
        name: 'Souvenirs',
        tag: 'souvenirs',
        price: 2200,
        inCart: 0
    },
    {
        name: 'Batik saree',
        tag: 'saree',
        price: 2300,
        inCart: 0
    },
    {
        name: 'Batik shirt',
        tag: 'shirt',
        price: 2500,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem
    ('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart =+ 1;
    }else {
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }
}

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
  
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +
        product.price);
    }else {
    localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products-container");

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
        })
            

    }

}

    



onLoadCartNumbers();
displayCart();