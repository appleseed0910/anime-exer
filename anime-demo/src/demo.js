import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
// import anime from '../node_modules/animejs/lib/anime.esm.js';
// import  * as anime from '../node_modules/animejs/lib/anime.esm.js'
// import { animate } from "animejs";
// import anime from 'animejs';
// import * as anime from 'animejs';

// import anime from 'animejs/lib/anime.esm.js';

const sections = document.querySelectorAll('section');

let currentIdx = 0;
let isScrolling = false;


// smooth scroll fn
function scrollToSection(idx) {
    if (idx < 0 || idx >= sections.length) return;

    isScrolling = true;
    sections[idx].scrollIntoView({behavior: 'smooth'});
    currentIdx = idx;

    setTimeout(() => isScrolling = false, 800)
};


// smooth scroll event
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        scrollToSection(currentIdx + 1);
        anime({
            targets: ".blocks",
            translateX: 200
        })
    } else {
        scrollToSection(currentIdx -1);
    }
})

