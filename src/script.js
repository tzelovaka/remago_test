import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const loader = new GLTFLoader();

const scene = new THREE.Scene();

//камера
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000);


const renderer = new THREE.WebGLRenderer();


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//освещение
const light = new THREE.AmbientLight( 0xFFE2B7 ); // желтовато-белый свет
scene.add( light );

//контроллеры
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();
let bot;

//загрузка 3D-модели
loader.load(
  "./b.gltf",
  (gltf) => { 
    gltf.scene.position.set(0, -5, 0);
    bot = gltf;
    console.log(gltf);
    pivot.add(bot.scene.children[23]);
    pivot.position.y = -5;
    pivot.rotation.y = 2.5;
    bot.scene.scale.set(1, 1, 1);
    bot.scene.rotation.y = 2.5
    scene.add(bot.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//часы
const clock = new THREE.Clock();

//оболчка для модели для корректной анимации
const pivot = new THREE.Object3D();
scene.add(pivot);

//рендер + анимация
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();
  pivot.rotation.y += 0.005;
  window.requestAnimationFrame(tick);
}
tick();