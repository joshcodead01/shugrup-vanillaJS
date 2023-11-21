// fetching navbar.html
// fetch('/components/navbar/navbar.html')
//     .then(response => response.text())
//     .then(html => define(html))
//     .catch(error => {
//         console.error('Error loading template:', error);
//     });

const xhr = new XMLHttpRequest();

xhr.open('GET', '/components/navbar/navbar.html', true)

xhr.onload = function() {
    if(xhr.status == 200){

        let html = this.responseText
        loadNavbar(html)

    } else {
         alert('error occur')
    }
}

xhr.send()

function loadNavbar(html){
    class Navbar extends HTMLElement {

        constructor() {
            super();
    
            const shadowRoot = this.attachShadow({ mode: 'open' });
    
            const template = document.createElement('template');
            template.innerHTML = html;
    
            const clone = document.importNode(template.content, true);
            shadowRoot.appendChild(clone);

        }    
    };
    
    customElements.define('navbar-component', Navbar)
}

