fetch('/components/new-arrivals-card/new-arrivals-card.html')
    .then(res => res.text())
    .then(html => {
        loadNewArrivalsCard(html);
    })
    .catch(err => {
        console.error('Error loading template: ', err);
    })


const loadNewArrivalsCard = (html) => {

    class NewArrivalsCard extends HTMLElement {
        constructor() {
            super();

            const shadowRoot = this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = html;

            const clone = document.importNode(template.content, true);

            shadowRoot.appendChild(clone);

        }
    }

    customElements.define('new-arrivals-card-component', NewArrivalsCard)
}


// populate data to the component from json file
const newArrivals_loader = () => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', '/json/newArrivalsSection.json', true);

    xhr.onload = function() {
        if (xhr.status == 200) {

            const data = JSON.parse(this.responseText)

            let html = ''

            data.new_arrivals.map((val, index) => {
                
                html += `
                    <new-arrivals-card-component>
                        <div slot="arrival" class="new_arrival_card_body" style="background-image: url('${val.cover_img}');">
                            <div slot="overlay" class="new_arrival_overlay">
                                <button slot="title" class="brand_name_cta">${val.title} > </button>
                            </div>
                        </div>
                        <img slot="brand_logo" src="${val.brand_logo}" alt="">
                    </new-arrivals-card-component>
                `;
            })

            document.querySelector('.new_arrivals_container').innerHTML = html;

        } else {
            console.log('not working!')
        }
    }

    xhr.send()
}


newArrivals_loader()