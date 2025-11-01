import './style.scss'
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {gsap} from "gsap";


//for room.html

const canvas = document.querySelector("#exp-canvas");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//modal setup
const modals = {
  about: document.querySelector(".modal")
};
document.querySelectorAll(".modal-buttons").forEach((button) => {
  button.addEventListener("click", (e) => {
    const modal = e.target.closest(".modal");
    hideModal(modal);
  });
});
const showModal = (modal) => {
  modal.style.display = "block";
  gsap.set(modal, {opacity:0});
  gsap.to(modal, {opacity:1, duration: 0.5});
};
const hideModal = (modal) => {
  gsap.to(modal, {opacity:0, duration: 0.5, onComplete: () => {modal.style.display = "none"}});
};

//load in models
const textureLoader = new THREE.TextureLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/")

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 0.1, 1000 );

//raycaster vars
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const raycasterObjects = [];
let curIntersects = [];
let curHoveredObj = null;

// Adding in Raycaster for mouse interactons
window.addEventListener("mousemove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// check for click
window.addEventListener("click", (e) => {
  if (curIntersects.length > 0) {
    const object = curIntersects[0].object;

    if (object.name.includes("Hover")) {
      showModal(modals.about);
    };
  }
})

// TODO: load in textures...

loader.load("/models/test_cat_v2.glb", (glb) => {
  glb.scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name.includes("Hover")) {
        child.userData.initialScale = new THREE.Vector3().copy(child.scale);
        child.userData.initialRotation = new THREE.Euler().copy(child.rotation);
        child.userData.initialPosition = new THREE.Vector3().copy(child.position);
      };
      if (child.name.includes("Raycaster")) {
        raycasterObjects.push(child);
      };

      //load in temporary texture
      child.material = new THREE.MeshStandardMaterial({
        color: 0x00ff00
      });
    }
  });
  scene.add(glb.scene);
});

//load in lighting
scene.add(new THREE.AmbientLight(0xffffff, 1));
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0xffffff, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.update();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function playHoverAnimation(obj, isHovering) {
  gsap.killTweensOf(obj.scale);
  gsap.killTweensOf(obj.rotation);
  gsap.killTweensOf(obj.position);

  if (isHovering) {
    gsap.to(obj.scale,{
      x: obj.userData.initialScale.x * 1.2,
      y: obj.userData.initialScale.x * 1.2,
      z: obj.userData.initialScale.x * 1.2,
      duration: 0.5,
      overwrite: "auto",
      ease: "bounce.out(1.8)",
    });
  }
  else {
    gsap.to(obj.scale,{
      x: obj.userData.initialScale.x,
      y: obj.userData.initialScale.x,
      z: obj.userData.initialScale.x,
      duration: 0.3,
      ease: "bounce.out(1.8)",
    });
  };
}

const render = () => {
  controls.update();

  // raycaster check
  raycaster.setFromCamera(pointer, camera);
  curIntersects = raycaster.intersectObjects(raycasterObjects);
  for (let i = 0; i < curIntersects.length; i++ ) {
    const curIntersectedObj = curIntersects[0].object;
    if (curIntersectedObj.name.includes("Hover")) {
      console.log("hover wokring");
      
      if (curIntersectedObj !== curHoveredObj) {
        if (curHoveredObj) {
          playHoverAnimation(curHoveredObj, false);
        }
        curHoveredObj = curIntersectedObj;
        playHoverAnimation(curIntersectedObj, true);
        
      };
    
    };

    curIntersects[i].object.material.color.set(0xff0000);
  }
  if (curIntersects.length>0) {
    document.body.style.cursor = "pointer";
  }
  else {
    //mouse no longer hovers over objects
    if (curHoveredObj) {
      playHoverAnimation(curHoveredObj, false);
      curHoveredObj = null;
    }
    for (let i = 0; i < raycasterObjects.length; i++ ) {
      raycasterObjects[i].material.color.set(0x00ff00);
    };
    document.body.style.cursor = "default";
  }


  renderer.render( scene, camera );
  window.requestAnimationFrame(render);

} 

render();