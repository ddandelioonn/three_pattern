import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 150);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// Создаем кубы в виде 3D-зигзага
const geometry = new THREE.BoxGeometry(2, 2, 2);
const colors = [0xf5b7b1, 0xd7bde2, 0xa9cce3, 0xa3e4d7, 0xf9e79f];

const zigzagWidth = 40;
const zigzagHeight = 3;
const zigzagDepth = 5;
const step = 5;

for (let i = 0; i < zigzagWidth; i++) {
    for (let j = 0; j < zigzagHeight; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const material = new THREE.MeshLambertMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(
            i * step - (zigzagWidth * step) / 2,
            j * step - (zigzagHeight * step) / 2,
            Math.sin(i * 0.5) * 20 + Math.cos(j * 0.5) * 10
        );
        cube.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        scene.add(cube);
    }
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
