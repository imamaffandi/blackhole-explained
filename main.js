import "./style.css";
import * as THREE from "three";
import AOS from "aos";
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#app"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

renderer.render(scene, camera);
// Background
const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;
function wave() {
  const geometry = new THREE.TorusGeometry(200, 200, 200, 200);
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.005,
    side: THREE.DoubleSide,
  });
  const orbit = new THREE.Points(geometry, material);
  orbit.rotation.y = 90;
  scene.add(orbit);
  function animate() {
    requestAnimationFrame(animate);
    orbit.rotation.z += 0.01;

    // controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
wave();

// Planet
function Planet() {
  const geometry = new THREE.SphereGeometry(2, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);
}
Planet();

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.rotation.z = t * -0.0001;
}

document.body.onscroll = moveCamera;
moveCamera();

// Audio
const music = document.getElementById("audio");
const triger = document.querySelector(".triger");

triger.addEventListener("click", () => {
  if (music.paused) {
    triger.classList.add("on");
    music.play();
  } else {
    triger.classList.remove("on");
    music.pause();
  }
});
// Smooth scroll animation
const goup = document.querySelector(".goup");
goup.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
AOS.init();
