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
var images = ["/personal-website/personal-website/src/laufey_bewitched.png","/personal-website/personal-website/src/genshin_logo.webp","/personal-website/personal-website/src/deltarune.webp","/personal-website/personal-website/src/omori_img.jpg","/personal-website/personal-website/src/peachriot.jpg","/personal-website/personal-website/src/wangyuja.jpg"];
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