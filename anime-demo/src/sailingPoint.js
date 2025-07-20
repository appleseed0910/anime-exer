import "./style.css";

const sections = document.querySelectorAll("section");

let currentIdx = 0;
let isScrolling = false;

const rollingBlocks = document.querySelectorAll(".rollingblocks");

// init openning fn // shuffle the blocks if there is parameter
function onInitOpening(rotatePoint = undefined) {
  // random generated transform / scale

  rollingBlocks.forEach((block) => {
    let scaleRandom = Math.random() * (10 - 0.5) + 0.5;
    let rotateRandom = Math.random() * 45;

    block.style.transform = `scale(${scaleRandom}) rotate(${rotateRandom}deg) `;
    const direction = Math.random() > 0.5 ? 1 : -1; // 正/反转
    let speed;

    if (scaleRandom < 2) {
      speed = anime.random(6000, 12000);
    } else if (scaleRandom < 5) {
      speed = anime.random(20000, 24000);
    } else if (scaleRandom < 7) {
      speed = anime.random(45000, 48000);
    } else if (scaleRandom < 9) {
      speed = anime.random(80000, 86000);
    } else {
      speed = anime.random(140000, 160000);
    }

    const anim = anime({
      targets: block,
      rotate: rotatePoint ?? `${direction > 0 ? "+=" : "-="}999999`,
      duration: speed * 999, // 实现几乎无穷转动
      easing: "linear",
    });

    block.anime = anim;
    block.onmouseenter = () => block.anime.pause();
    block.onmouseleave = () => block.anime.play();
  });
}

// add pausing event listener to each block
function addEventToOpenningBlocks() {
  rollingBlocks.forEach((block) => {
    block.addEventListener("mouseenter", pausing);
    block.addEventListener("mouseleave", resuming);
    block.addEventListener("click", shuffling);
  });
}

function pausing(event) {
  event.target.anime.pause();
}

function resuming(event) {
  event.target.anime.play();
}

function shuffling(event) {
  rollingBlocks.forEach((block) => anime.remove(block));
  onInitOpening();
}

// smooth scroll fn
function scrollToSection(idx) {
  if (idx < 0 || idx >= sections.length) return;

  isScrolling = true;
  sections[idx].scrollIntoView({ behavior: "smooth" });
  // playScrollBlocksAnimation(currentIdx, idx);
  goTo(currentIdx, idx);
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

// const anim0to1 = anime({
//   targets: ".blocks",
//   translateX: "-53vw",
//   translateY: "-14vh",
//   duration: 1500,
//   direction: "forward",
//   easing: 'easeOutCubic',
//   autoplay: false,
// });

// function playAnime0to1(isBack = "") {
//   let direction = isBack ? "reverse" : "forward";
//   anim0to1.pause();
//   anim0to1.direction = direction;
//   isBack ? anim0to1.seek(anim0to1.duration) : anim0to1.seek(0);
//   anim0to1.play();
// }

// const anim1to2 = anime({
//   targets: ".blocks",
//   translateX: "-53vw",
//   translateY: "10vh",
//   duration: 1500,
//   direction: "forward",
//   easing: 'easeOutCubic',
//   autoplay: false,
// });

// function playAnime1to2(isBack = "") {
//   let direction = isBack ? "reverse" : "forward";
//   anim1to2.pause();
//   anim1to2.direction = direction;
//   isBack ? anim1to2.seek(anim1to2.duration) : anim1to2.seek(0);
//   anim1to2.play();
// }

function playScrollBlocksAnimation(prevIdx, currentIdx) {
  switch (`${prevIdx}-${currentIdx}`) {
    case "0-1":
      playAnime0to1();
      break;
    case "1-0":
      playAnime0to1("back");
      break;
    case "1-2":
      playAnime1to2();
      break;
    case "2-1":
      playAnime1to2("back");
      break;
  }
}


// section 02 carousel - tab
const tabs = document.querySelectorAll(".tab");
const underline = document.querySelector(".underline");
const carousel = document.querySelector(".carousel");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // 1. 移动下划线
    underline.style.transform = `translateX(${index * 100}%)`;

    // // 2. 切换字体粗细
    // tabs.forEach(t => t.classList.remove("active"));
    // tab.classList.add("active");

    // 3. 移动 carousel 内容
    carousel.style.transform = `translateX(-${index * 50}%)`; // 一页宽度是 50%
  });
});

const tabs01 = document.querySelectorAll(".tab-01");
const underline01 = document.querySelector(".underline-01");
const carousel01 = document.querySelector(".carousel-01");

tabs01.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    // 1. 移动下划线
    underline01.style.transform = `translateX(${index * 100}%)`;

    // // 2. 切换字体粗细
    // tabs.forEach(t => t.classList.remove("active"));
    // tab.classList.add("active");

    // 3. 移动 carousel 内容
    carousel01.style.transform = `translateX(-${index * 50}%)`; // 一页宽度是 50%
  });
});

onInitOpening();
addEventToOpenningBlocks();


function createSlideAnimation({ fromX, toX, fromY, toY }) {
  return anime({
    targets: '.blocks',
    translateX: [fromX, toX],
    translateY: [fromY, toY],
    easing: 'easeOutCubic',
    duration: 1500,
    autoplay: false
  });
}


function play0to1(forward = true) {
  anime({
    targets: '.blocks',
    translateX: ['0vw', '-53vw'],
    translateY: ['0vh', '-14vh'],
    rotate: '+=360',
    scale: [1, .5, 1],
    duration: 1500,
    direction: forward ? 'normal' : 'reverse',
    easing: 'easeOutCubic'
  });
}

function play1to2(forward = true) {
  anime({
    targets: '.blocks',
    translateY: ['-14vh', '-4vh'],
    duration: 600,
    direction: forward ? 'normal' : 'reverse',
    easing: 'easeOutSine'
  });
}

function play2to3(forward = true) {
  anime({
    targets: '.blocks',
    translateY: ['-4vh', '6vh'],
    duration: 600,
    direction: forward ? 'normal' : 'reverse',
    easing: 'easeOutSine'
  });
}

function play3to4(forward = true) {
  anime({
    targets: '.blocks',
    translateY: ['6vh', '16vh'],
    duration: 600,
    direction: forward ? 'normal' : 'reverse',
    easing: 'easeOutSine'
  });
}

function play4to5(forward = true) {
  anime({
    targets: '.blocks',
    translateY: ['16vh', '26vh'],
    duration: 600,
    direction: forward ? 'normal' : 'reverse',
    easing: 'easeOutSine'
  });
}

function play5to6(forward = true) {
  anime({
    targets: '.blocks',
    translateX: ['-53vw', '3vw'],
    translateY: ['26vh', '-16vh'],
    rotate: '+=360',
    scale: [1, .5, 1],
    duration: 1500,
    direction: forward ? 'normal' : 'reverse',
    easing: 'easeOutBack'
  });
}


function goTo(currentIndex, index) {
  switch (`${currentIdx}-${index}`) {
    case "0-1":
      play0to1(true);
      break;
    case "1-0":
      play0to1(false)
      break;
    case "1-2":
      play1to2(true);
      break;
    case "2-1":
      play1to2(false);
      break;
    case "2-3":
      play2to3(true);
      break;
    case "3-2":
      play2to3(false);
      break;
    case "3-4":
      play3to4(true);
      break;
    case "4-3":
      play3to4(false);
      break;
    case "4-5":
      play4to5(true);
      break;
    case "5-4":
      play4to5(false);
      break;
    case "5-6":
      play5to6(true);
      break;
    case "6-5":
      play5to6(false);
      break;
  }

  currentIndex = index;
}

// function playSlide(toIdx) {
//   const goingForward = toIdx > currentIdx;

//   // 简单例子：0 -> 1, 1 -> 0
//   if (currentIdx === 0 && toIdx === 1) {
//     slide0to1.direction = 'normal';
//     slide0to1.play();
//   } else if (currentIdx === 1 && toIdx === 0) {
//     slide0to1.direction = 'reverse';
//     slide0to1.play();
//   }

//   if (currentIdx === 1 && toIdx === 2) {
//     slide1to2.direction = 'normal';
//     slide1to2.play();
//   } else if (currentIdx === 2 && toIdx === 1) {
//     slide1to2.direction = 'reverse';
//     slide1to2.play();
//   }

//   currentIdx = toIdx;
// }
