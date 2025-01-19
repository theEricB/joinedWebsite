import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera( 40, (window.innerWidth/5*2) / window.innerHeight*1.3, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth/5*2, window.innerHeight/5*4 );
document.getElementById("latentSpace").appendChild( renderer.domElement );
const controls2 = new OrbitControls( camera2, renderer.domElement );


camera2.position.set(15,50,-60);
camera2.lookAt(new THREE.Vector3(13,13,-13));


// SOME LIGHT
const light1 = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
light1.position.set(5, 0, 0);
scene2.add(light1);

// axis
// const axesHelper = new THREE.AxesHelper( 5 );
// scene2.add( axesHelper );  


const sphereGeometry = new THREE.SphereGeometry(.5, 8, 8); // Radius: 1, widthSegments: 8, heightSegments: 8
const pinkReflectiveMaterial = new THREE.MeshStandardMaterial({color: 0xff69b4});
const sphere = new THREE.Mesh(sphereGeometry, pinkReflectiveMaterial);
scene2.add(sphere);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
directionalLight.position.set(2, 10, 7.5);
scene2.add(directionalLight);



let selector = document.getElementById("modelSelector");
let current_model = selector.value
selector.addEventListener("change", function() {
  if(selector.value != current_model)
  {
    current_model = selector.value
  }
});
let loc = "results/" + current_model + ".glb"

const loader = new GLTFLoader();
loader.load(loc, function ( gltf ) {
    let model = gltf.scene;
    scene2.add( model );
});

let scale = 26.5

// dynamical resizing
window.addEventListener('resize', function()
{
  var width = window.innerWidth/5*2;
  var height = window.innerHeight/5*4;
  renderer.setSize(width, height);
  camera2.aspect = width / height;
  camera2.updateProjectionMatrix();
});

function animate() {
    const slidX = document.getElementById("sliderX").value;
    const slidY = document.getElementById("sliderY").value;
    const slidZ = document.getElementById("sliderZ").value;

    sphere.position.x = (slidX*scale);
    sphere.position.z = (slidZ*scale*-1);
    sphere.position.y = (slidY*scale);


    requestAnimationFrame( animate );
    renderer.render( scene2, camera2 );
}


animate();