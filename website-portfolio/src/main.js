import './style.scss'
import * as THREE from 'three';

const width = window.innerWidth;
const height = window.innerHeight;

const canvas = document.querySelector("#exp-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize( width, height );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const render = () => {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
  window.requestAnimationFrame(render);

} 

render();