fetch('/components/topbanner/topbanner.html')
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

    customElements.define('topbanner-component', TopBanner)
}


function carouselAnimation() {
    document.addEventListener('DOMContentLoaded', function () {

        const carousel = document.getElementById('word-carousel');
        const words = document.getElementsByTagName('span');
        const totalWords = words.length;
        console.log(totalWords)
    
        let currentIndex = 0;
    
        function showNextWord() {
            currentIndex = (currentIndex + 1) % totalWords;
            updateCarousel();
        }
    
        function updateCarousel() {
            const translateValue = -currentIndex * 100 + '%';
            carousel.style.transform = 'translateX(' + translateValue + ')';
        }
    
        setInterval(showNextWord, 6000);
    });
}

carouselAnimation();