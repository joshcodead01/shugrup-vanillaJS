let xmldata = document.getElementById('xmldata')
let shoe = xmldata.getElementsByTagName('Shoe')
 
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

for (let i = 0; i < shoe.length; i++) {
    const id = i + 1
    const product_photo = shoe[i].children[0].firstChild.data
    const product_name = shoe[i].children[1].firstChild.data
    const description = shoe[i].children[2].firstChild.data
    const price = Number(shoe[i].children[3].firstChild.data)

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
    Add_to_cart.setAttribute(Attributes.inputType, 'button')
    Add_to_cart.setAttribute(Attributes.inputValue, buttondesign.value1)
    Add_to_cart.setAttribute(Attributes.class, buttondesign.btn1_design)

    Add_to_cart.addEventListener('click', () => {
        productToCart(id, product_photo, product_name, description, price)
       
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

        if (itemExist) {
            const index = currentItem.findIndex(item => item.id == id);
            currentItem[index].quantity += 1;
        } else {
            currentItem.push({
                id,
                product_photo,
                product_name,
                description,
                price,
            })
        }

        return localStorage.setItem('cartItems', JSON.stringify(currentItem))
    }
}

document.querySelector('#cart_icon').addEventListener('click', () => displayToCart())

function displayToCart() {
    const item = localStorage.getItem('cartItems')
    
    const cartContainer = document.querySelector('#cartProductContainer')

    if (!item || item.length <= 0) {
        cartContainer.innerHTML = `<p style="color: black; text-align: center; ">No Item</p>`
    } else {
        cartContainer.innerHTML = `<p style="color: black;"> ${item.product_name} </p>`
    }   
}
