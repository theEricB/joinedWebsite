import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene, Camera, and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement

// Axes Helper
const axesHelper = new THREE.AxesHelper(5); // Size of axes helper
scene.add(axesHelper);

// Light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 5, 5);
// directionalLight.castShadow = true; // Enable shadows for this light
// scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Ambient light
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x333333, 0.4); // Sky-ground light
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);


// Optional: Point Light for Highlights
const pointLight = new THREE.PointLight(0xffffff, 0.5, 50); // Color, intensity, distance
pointLight.position.set(-5, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

// Larger floor with thickness
const floorGeometry = new THREE.BoxGeometry(20, 0.5, 20); // Width, Height (thickness), Depth
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.25; // Lower the floor so it aligns with the origin
floor.receiveShadow = true; // Enable shadow receiving
scene.add(floor);

// Thin surface objects without thickness
const surfaceGeometry1 = new THREE.PlaneGeometry(5, 5); // Width, Height
const surfaceMaterial1 = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const surface1 = new THREE.Mesh(surfaceGeometry1, surfaceMaterial1);
surface1.position.set(-5, 2.5, 0); // Position above and to the left
surface1.rotation.x = Math.PI / 2; // Rotate to face upwards
surface1.castShadow = true; // Enable shadow casting
surface1.receiveShadow = true; // Enable shadow receiving
scene.add(surface1);

const surfaceGeometry2 = new THREE.PlaneGeometry(3, 7);
const surfaceMaterial2 = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const surface2 = new THREE.Mesh(surfaceGeometry2, surfaceMaterial2);
surface2.position.set(5, 3.5, 0); // Position above and to the right
surface2.rotation.y = Math.PI / 4; // Rotate to tilt slightly
surface2.castShadow = true; // Enable shadow casting
surface2.receiveShadow = true; // Enable shadow receiving
scene.add(surface2);

// MESH IS NOW CASTING ANY SHADOW
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0,   // Bottom-left corner
    2, 0, 3,   // Bottom-right corner
    0, 4, 0,   // Top-left corner
    0, 4, 0,   // Top-left corner
    5, 0, 0,   // Bottom-right corner
    -4, 3, 0,   // Top-right corner
  ]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// Automatically compute normals
geometry.computeVertexNormals();

const mesh = new THREE.Mesh(geometry, surfaceMaterial2);
mesh.castShadow = true; // Enable shadow casting
mesh.receiveShadow = true; // Enable shadow receiving
scene.add(mesh);

const edgesGeometry = new THREE.EdgesGeometry(geometry); // Replace 'geometry' with your object geometry
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 10}); // Glowy color (purple)

// Create the edges mesh
const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
scene.add(edges);




// Handle resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required if damping is enabled
    renderer.render(scene, camera);
}

animate();
