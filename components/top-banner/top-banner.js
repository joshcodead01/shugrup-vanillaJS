fetch('/components/top-banner/top-banner.html')
    .then(res => res.text())
    .then(html => {
        loadTopBanner(html)
    })
    .catch(err => {
        console.error('Error loading template: ', err);
    })


const loadTopBanner = (html) => {
    class TopBanner extends HTMLElement {
        constructor() {
            super();

            const shadowRoot = this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = html;

            const clone = document.importNode(template.content, true);
            shadowRoot.appendChild(clone)
        }
    }

    customElements.define('top-banner-component', TopBanner)
}