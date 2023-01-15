
const Attributes = {
    class: 'class',
    id: 'id',
    src: 'src',
    style: 'style',
    inputValue: 'value',
    inputType: 'type'
}

class card_buttons {

    constructor(btn1_design, btn2_design, value1, value2){
        this.btn1_design = btn1_design
        this.btn2_design = btn2_design
        this.value1 = value1
        this.value2 = value2
    }
}

fetch('/products.json')
    .then(res => res.json())
    .then(data => {

    data.Shoes.forEach((item, index ) => {
        const id = index + 1
        const product_photo = item.productImg
        const product_name = item.name
        const description = item.description
        const price = Number(item.price)

        let card_img = document.createElement('img')
        card_img.setAttribute('class', 'card-img-top' )
        card_img.setAttribute(Attributes.src, product_photo)
        
        const card_body = document.createElement('div')
        card_body.setAttribute(Attributes.class, 'card-body')

        // parts of card_body
        let card_title = document.createElement('h6')
        card_title.setAttribute(Attributes.class, 'card-title')
        card_title.append(product_name)
        
        let card_text = document.createElement('p')
        card_text.setAttribute(Attributes.class, 'card-text')
        card_text.append(description)
        
        let card_text_price = document.createElement('p')
        card_text_price.setAttribute(Attributes.class, 'card-text font-weight-bold')
        card_text_price.setAttribute(Attributes.style, 'color: green')
        card_text_price.append(price)
        
        
        card_body.append(card_title, card_text, card_text_price)
        // ***
        
        const card_footer = document.createElement('div')
        card_footer.setAttribute(Attributes.class, 'card-footer bg-white d-flex justify-content-center')
        
        // parts of card_footer
        
        //object for the design of buttons
        const buttondesign = new card_buttons('add_to_cart', 'add_to_favorite ml-4', 'Add to Cart', 'Favorite ♡')
        let Add_to_cart = document.createElement('input')
        Add_to_cart.setAttribute(Attributes.inputType, 'submit')
        Add_to_cart.setAttribute(Attributes.inputValue, buttondesign.value1)
        Add_to_cart.setAttribute(Attributes.class, buttondesign.btn1_design)


        Add_to_cart.addEventListener('click', () => {
            productToCart(id, product_photo, product_name, description, price)
            cartNumber()
        })

        
        let Wishlist = document.createElement('input')
        Wishlist.setAttribute(Attributes.inputType, 'button')
        Wishlist.setAttribute(Attributes.inputValue, buttondesign.value2)
        Wishlist.setAttribute(Attributes.class, buttondesign.btn2_design)
        Wishlist.addEventListener('click', () => {
            console.log('wishlist')
        })
        
        card_footer.append(Add_to_cart, Wishlist)
        // ***
        
        const card = document.createElement('div')
        card.setAttribute(Attributes.class, 'card shadow p-3 mb-3 rounded')
        card.append(card_img, card_body, card_footer)
        
        document.querySelector('.card-deck').append(card)
    }

)})



document.querySelector('#cart_icon').addEventListener('click', () => {
    displayToCart()
})



function displayToCart() {
    const item = JSON.parse(localStorage.getItem('cartItems'))
    
    const cartContainer = document.querySelector('#cartProductContainer')
    if (!item || item.length <= 0) {
        cartContainer.innerHTML = `<p style="color: black; text-align: center; ">No Item</p>`
    } else {
        cartContainer.innerHTML = ''
        for (let i = 0; i < item.length; i++){

            const id = item[i].id
            const product_photo = item[i].product_photo
            const product_name = item[i].product_name
            const description = item[i].description
            const price = item[i].price
            const quantity = item[i].quantity

            const productItems = document.createElement('div')
            productItems.setAttribute(Attributes.class, 'productItems')

            const cont1 = document.createElement('div')
            cont1.setAttribute(Attributes.class, 'cont1')

            const span = document.createElement('span')

            const nav_icons = document.createElement('img')
            Object.assign(nav_icons, {
                src: '../public/assets/Icons/wishlist logo.svg',
                className: 'nav_icons'
            })
            span.append(nav_icons)
           
            const productImg = document.createElement('img')
            Object.assign(productImg, {
                src: `${product_photo}`,
                className: 'productImg'
            })
            cont1.append(span, productImg)


            const cont2 = document.createElement('div')
            cont2.setAttribute(Attributes.class, 'cont2')

            const productName = document.createElement('h6')
            productName.setAttribute(Attributes.class, 'productName')
            productName.append(`${product_name}`)

            const productDescription = document.createElement('p')
            productDescription.setAttribute(Attributes.class, 'productDescription')
            productDescription.append(item[i].description)
            cont2.append(productName, `${description}`)

            const quantity_nav = document.createElement('div')
            quantity_nav.setAttribute(Attributes.class, 'quantity_nav')

            const dicrementBtn = document.createElement('input')
            Object.assign(dicrementBtn, {
                className: 'quantityBtn dicrement',
                type: 'button',
                value: '-',
                onclick: () => {
                    dicrementQuantity(id)
                    cartNumber()
                }
            })

            let productQuantity = document.createElement('p')
            productQuantity.setAttribute(Attributes.class, 'productQuantity')
            productQuantity.append(`${quantity}`)

            const incrementBtn = document.createElement('input')
            Object.assign(incrementBtn, {
                className: 'quantityBtn increment',
                type: 'button',
                value: '+',
                onclick: () => {
                    incrementQuantity(id)
                }
            })


            quantity_nav.append(dicrementBtn, productQuantity, incrementBtn)
            
            let priceCont = document.createElement('div')
            priceCont.setAttribute(Attributes.class, 'priceCont')

            let priceText = document.createElement('p')
            priceText.setAttribute(Attributes.class, 'priceText')
            priceText.append(`${price}`)
            priceCont.append(priceText)

            productItems.append(cont1, cont2, quantity_nav, priceCont)
            cartContainer.append(productItems)
        }

        }   

}
    


document.querySelector('.removeBtn').addEventListener('click', () => {
    localStorage.removeItem('cartItems')
    location.reload()
})



function productToCart(id, product_photo, product_name, description, price) {
    
    if (!localStorage.getItem('cartItems') || localStorage.getItem('cartItems').length <= 0) {
        const cart = []
        const quantity = 1
        cart.push({
            id,
            product_photo,
            product_name,
            description,
            quantity, 
            price
        })
        
        console.log(cart)
    
        return localStorage.setItem('cartItems', JSON.stringify(cart))
    }

    if (localStorage.getItem('cartItems').length > 0) {
        const currentItem = JSON.parse(localStorage.getItem('cartItems'))
        const itemExist = currentItem.some(item => item.id == id)
        const index = currentItem.findIndex(item => item.id == id);

        if (itemExist) {
            currentItem[index].quantity += 1;
            //updating product quantity display
            try {
                const quantityElement = document.getElementsByClassName('productQuantity')
                quantityElement[index].innerText = currentItem[index].quantity
                
            } catch (error) {
                //catching error
            }
            
        } else {
            const quantity = 1
            currentItem.push({
                id,
                product_photo,
                product_name,
                description,
                quantity,
                price,
            })
        }

        return localStorage.setItem('cartItems', JSON.stringify(currentItem))
    }

}



function dicrementQuantity(id) {

    const currentItem = JSON.parse(localStorage.getItem('cartItems'))
    const itemExist = currentItem.some(item => item.id == id)
    const index = currentItem.findIndex(item => item.id == id)

    if (localStorage.getItem('cartItems').length > 0) {

        
        if (itemExist) {
            currentItem[index].quantity -= 1;

            //updating product quantity display
            const quantityElement = document.getElementsByClassName('productQuantity')
            quantityElement[index].innerText = currentItem[index].quantity


        } else {
            console.log('dicrementing the product quantity did not work')
        }

        if (currentItem[index].quantity === 0) {

            currentItem.splice(index, 1)
            location.reload()

        } 

        return localStorage.setItem('cartItems', JSON.stringify(currentItem))

    } 
}


function incrementQuantity(id, product_photo, product_name, description, price) {

    if (localStorage.getItem('cartItems').length > 0) {
        const currentItem = JSON.parse(localStorage.getItem('cartItems'))
        const itemExist = currentItem.some(item => item.id == id)
        const index = currentItem.findIndex(item => item.id == id);

        if (itemExist) {
            currentItem[index].quantity += 1
            //updating product quantity display
            const quantityElement = document.getElementsByClassName('productQuantity')
            quantityElement[index].innerText = currentItem[index].quantity

            const prodPrice = currentItem[index].price * currentItem[index].quantity
            let priceElem = document.createElement("span");
            priceElem.innerText = prodPrice;
                        
        } else {
            const quantity = 1
            currentItem.push({
                id,
                product_photo,
                product_name,
                description,
                quantity,
                price,
            })
        }

        return localStorage.setItem('cartItems', JSON.stringify(currentItem))
    }
}


function cartNumber() {
    const items = JSON.parse(localStorage.getItem('cartItems'))

    if (!items) {
        document.querySelector('#cart-number').innerText = 0
    } else {
        document.querySelector('#cart-number').innerText = items.length
    }
}

cartNumber()
