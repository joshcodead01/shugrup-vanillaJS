fetch('/components/footer/footer.html')
    .then(res => res.text())
    .then(html => {
        console.log('html component has been loaded!')
        loadFooter(html)
    })
    .catch(error => {
        console.error('Error loading template: ', error);
    })


const loadFooter = (html) => {
    class Footer extends HTMLElement {
        constructor() {
            super();

            const shadowRoot = this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.setAttribute('class', 'footer_component')
            template.innerHTML = html;

            const clone = document.importNode(template.content, true);
            shadowRoot.appendChild(clone)

        }
    }

    customElements.define('footer-component', Footer);
}