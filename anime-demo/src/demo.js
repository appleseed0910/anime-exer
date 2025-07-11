import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import { Timeline, onScroll, animate, utils } from "animejs";
import { waapi } from "animejs";


const sections = document.querySelectorAll('section');

let currentIdx = 0;
let isScrolling = false;

function scrollToSection(idx) {
    if (idx < 0 || idx >= sections.length) return;

    isScrolling = true;
    sections[idx].scrollIntoView({behavior: 'smooth'});
    currentIdx = idx;

    setTimeout(() => isScrolling = false, 800)
};

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        scrollToSection(currentIdx + 1);
    } else {
        scrollToSection(currentIdx -1);
    }
})

