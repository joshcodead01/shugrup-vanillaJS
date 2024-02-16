fetch('/components/product-card/product-card.html')
    .then(res => res.text())
    .then(html => {
        loadProductCard(html)
    })
    .catch(err => {
        console.error('Error loading template: ', err);
    })

const loadProductCard = (html) => {
    class ProductCard extends HTMLElement {

        constructor() {
            super();

            const shadowRoot = this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = html;

            const clone = document.importNode(template.content, true);
            shadowRoot.appendChild(clone)
        }
    }

    customElements.define('product-card-component', ProductCard)
}


// populate data to the component from json file
const ProductCard_loader = () => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/json/products.json', true);

    xhr.onload = function() {
        if (xhr.status == 200) {

            const data = JSON.parse(this.responseText);

            let htmls = ''

            data.shoes.map((val, index) => {

                let colorsHTML = val.colors.map((color, index) => {
                    return `
                        <li class="color_item">
                            <div class="color_item_bg"></div>
                            <div class="color" style="background-color: ${color}"></div>
                        </li>
                    `;
                }).join('');
                
                htmls += `
                    <product-card-component>
                        <div slot="product_img" class="product_img" style="background-image: url('${val.productImg}')";>
                            <img src="/assets/Icons/love_icon.svg" id="love_icon" class="love_icon">
                        </div>

                        <div slot="product_info">
                            <div class="product_description">
                                <div>
                                    <p class="product_name">${val.name}</p>
                                    <p class="product_type">${val.type}</p>
                                </div>
                                <p class="product_price">$${val.price}</p>
                            </div>
                            <div class="product_color">
                                <ul class="product_color">
                                   ${colorsHTML}
                                </ul>
                            </div>
                        </div>
                    </product-card-component>
                `;
            });

            document.querySelector('.product_catalog_container').innerHTML = htmls;

        } else {
            console.log('not working!')
        }
    }

    xhr.send()
}

ProductCard_loader();