import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import  * as anime from '../node_modules/animejs/lib/anime.esm.js'
import { waapi } from "animejs";


const [ $logo ] = anime.utils.$('.logo.js');
const [ $button ] = anime.utils.$('button');
let rotations = 0;

anime.animate('.logo.js', {
    scale: [
      { to: 1.25, ease: 'inOut(3)', duration: 200 },
      { to: 1, ease: anime.createSpring({ stiffness: 300 }) }
    ],
    loop: true,
    loopDelay: 300,
  });
  
  // Make the logo draggable around its center
  anime.createDraggable('.logo.js', {
    container: [0, 0, 0, 0],
    releaseEase: anime.createSpring({ stiffness: 200 })
  });
  
  // Animate logo rotation on click
  const rotateLogo = () => {
    rotations++;
    $button.innerText = `rotations: ${rotations}`;
    anime.animate($logo, {
      rotate: rotations * 90,
      ease: 'out(4)',
      duration: 200,
    });
  }
  

  
  $button.addEventListener('click', rotateLogo);
