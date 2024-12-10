import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { latentCoordinates } from './latent_coordinates.js'
import { dataset } from './dataset.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera( 40, (window.innerWidth/2) / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth/2, window.innerHeight );
document.getElementById("latentSpace").appendChild( renderer.domElement );
const controls2 = new OrbitControls( camera2, renderer.domElement );

camera2.position.set(-4,2,2);
camera2.lookAt(new THREE.Vector3(0,0,0));


// SOME LIGHT
const light1 = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
light1.position.set(5, 0, 0);
scene2.add(light1);

// axis
const axesHelper = new THREE.AxesHelper( 5 );
scene2.add( axesHelper );  


const sphereGeometry = new THREE.SphereGeometry(1, 8, 8); // Radius: 1, widthSegments: 8, heightSegments: 8
const pinkReflectiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xff69b4,  // Pink color
    metalness: 0.5,   // Adjust metalness for reflectivity
    roughness: 0.5,   // Adjust roughness for a shiny surface
  });
const sphere = new THREE.Mesh(sphereGeometry, pinkReflectiveMaterial);
scene2.add(sphere);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
directionalLight.position.set(2, 10, 7.5);
scene2.add(directionalLight);

const loader = new GLTFLoader();
let loc = "latent.glb"
loader.load(loc, function ( gltf ) {
    let model = gltf.scene;
    scene2.add( model );
});

let scale = 26.5
function animate() {
    const slidX = document.getElementById("sliderX").innerHTML;
    const slidY = document.getElementById("sliderY").innerHTML;
    const slidZ = document.getElementById("sliderZ").innerHTML;

    sphere.position.x = (slidX*scale);
    sphere.position.z = (slidZ*scale*-1);
    sphere.position.y = (slidY*scale);

    requestAnimationFrame( animate );
    renderer.render( scene2, camera2 );
}
animate();