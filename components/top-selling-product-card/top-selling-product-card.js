fetch('/components/top-selling-product-card/top-selling-product-card.html')
    .then(res => res.text())
    .then(html => {
        loadTopProductCard(html)
    })
    .catch(err => {
        console.error('Error loading template: ', err);
    })


const loadTopProductCard = (html) => {
    class TopProductCard extends HTMLElement {
        constructor() {
            super();

            const shadowRoot = this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = html;

            const clone = document.importNode(template.content, true);
            shadowRoot.appendChild(clone)
        }
    }

    customElements.define('top-selling-product-card-component', TopProductCard)
}


// populate data to the component from json file
const topSellingProductCard_loader = () => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/json/products.json', true);

    xhr.onload = function() {
        if (xhr.status == 200) {

            const data = JSON.parse(this.responseText)
            console.log(data.shoes)

            const shoes = data.shoes.filter(item => typeof item.productRanked === 'number');

            let html = ''

            shoes.forEach(val => {
                console.log(val)
                
                html += `
                <top-selling-product-card-component>
                    <div slot="product_image" class="product_image" style="background-image: url('${val.productImg}');"></div>
                    <div slot="product_info" class="product_info">
                        <div class="info">
                            <p class="product_name">${val.name}</p>
                            <p class="product_price">$${val.price}</p>
                        </div>
                        <input type="button" value="Buy Now" class="buy_now_cta">
                        <div slot="product_badge" class="product_badge">
                            <p class="ranked_number">#${val.productRanked}</p>
                        </div>
                    </div>
                </top-selling-product-card-component>
                `;
            })
            
            document.querySelector('.top_selling_products_container').innerHTML = html;

        } else {
            console.log('not working!')
        }
    }

    xhr.send()
}


topSellingProductCard_loader();


function sample(){
    const data = [1, 'apple', undefined, 42, 'banana', undefined, 7, 'orange'];

    // Filter out undefined values and keep only numbers
    const numbers = data.filter(item => typeof item === 'number');

// Print the numbers
numbers.forEach(number => {
  console.log(number);
});

}

sample();