//for index.html
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

// for inspo slideshow
var inspo_img = document.getElementById("inspo_slideshow");
var images = ["src/laufey_bewitched.png","src/genshin_logo.webp","src/deltarune.webp","src/omori_img.jpg","src/peachriot.jpg","src/wangyuja.jpg"];
var index=0;

function changeImage()
{
  inspo_img.setAttribute("src", images[index]);
  index++;
  if(index >= images.length)
  {
    index=0;
  }
}

setInterval(changeImage, 1000);