import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
// import anime from '../node_modules/animejs/lib/anime.esm.js';
// import  * as anime from '../node_modules/animejs/lib/anime.esm.js'
// import { animate } from "animejs";
// import anime from 'animejs';
// import * as anime from 'animejs';

const sections = document.querySelectorAll("section");

let currentIdx = 0;
let isScrolling = false;

// smooth scroll fn
function scrollToSection(idx) {
  if (idx < 0 || idx >= sections.length) return;

  isScrolling = true;
  sections[idx].scrollIntoView({ behavior: "smooth" });
  playScrollBlocksAnimation(currentIdx, idx);
  currentIdx = idx;

  setTimeout(() => (isScrolling = false), 800);
}

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) {
    scrollToSection(currentIdx + 1);
  } else {
    scrollToSection(currentIdx - 1);
  }
});

let slide0to1;

function playScrollBlocksAnimation(prevIdx, currentIdx) {
  if (prevIdx == 0 && currentIdx == 1) {
    slide0to1 = anime({
      targets: ".blocks",
      translateX: function () {
        return anime.random(10, 11) + "vw";
      },
      scale: function () {
        return anime.random(10, 30) / 10;
      },
      rotate: function () {
        return anime.random(-360, 360);
      },
      duration: 1500,
      autoplay: false
    });
    slide0to1.play();
  } else {
    console.log("aaaaaaaaaaaarrrrrrrrrghhhh")
    slide0to1.direction ='reverse';
    slide0to1.play();
  }
}
