import "./style.css";

const sections = document.querySelectorAll("section");

let currentIdx = 0;
let isScrolling = false;
let slide0to1;

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

const anim0to1 = anime({
  targets: ".blocks",
  translateX: "3vw",
  // scale: function () {
  //   return anime.random(10, 30) / 10;
  // },
  duration: 1500,
  direction: "forward",
  autoplay: false,
});

function playAnime0to1(isBack = "") {
  let direction = isBack ? "reverse" : "forward";

  //

  anim0to1.pause();
  anim0to1.direction = direction;
  isBack ? anim0to1.seek(anim0to1.duration) : anim0to1.seek(0);
  anim0to1.play();
}

function playScrollBlocksAnimation(prevIdx, currentIdx) {
  switch (`${prevIdx}-${currentIdx}`) {
    case "0-1":
      playAnime0to1();
      break;
    case "1-0":
      playAnime0to1("back");
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
