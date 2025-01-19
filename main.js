import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const geometry = new THREE.SphereGeometry(1, 16, 16);
const colors = [0xff6347, 0x1e90ff, 0x32cd32, 0xffd700, 0x8a2be2];

// Создаем объекты по спирали
const radius = 30;
const heightStep = 1;
const turns = 10;
const spheresPerTurn = 20;

for (let i = 0; i < turns * spheresPerTurn; i++) {
    const angle = (i % spheresPerTurn) * (2 * Math.PI / spheresPerTurn);
    const height = (i / spheresPerTurn) * heightStep;

    const material = new THREE.MeshLambertMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
        radius * Math.cos(angle),
        height,
        radius * Math.sin(angle)
    );
    sphere.scale.set(1.5, 1.5, 1.5);

    scene.add(sphere);
}

// Анимация
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();

// Обновление размеров окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
