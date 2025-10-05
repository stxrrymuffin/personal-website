//for about.html
import './style.scss'
const cute_cat = document.getElementById("cute-cat");
const hoverSfx = document.getElementById("hover-sfx");

cute_cat.addEventListener("mouseenter", () => {
  hoverSfx.currentTime = 0; 
  hoverSfx.play();
});

const canvas = document.querySelector("#exp-canvas");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};