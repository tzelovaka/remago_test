import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const loader = new GLTFLoader();

let mixer = null;

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 15, 0);
scene.add(hemiLight);

const spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(-200, -200, -200);
scene.add(spotLight2);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();
let bot;
loader.load(
  "./b.gltf",
  (gltf) => {
    bot = gltf;
    pivot.add(bot.scene.children[23]);
    gltf.scene.scale.set(1, 1, 1);
    scene.add(bot.scene);
    console.log(gltf);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
const clock = new THREE.Clock();
const pivot = new THREE.Object3D();
scene.add(pivot);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  
  // Rotate the pivot
  pivot.rotation.y += 0.005;
  
  if (mixer){
    mixer.update(delta);
  }
  window.requestAnimationFrame(tick);
}
tick();