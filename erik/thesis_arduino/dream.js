function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;
    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
    mesh.localToWorld( middle );
    return middle;
}

async function decode(input) {
    const sess = new onnx.InferenceSession()
    await sess.loadModel('onnx_model.onnx')
    const outputMap = await sess.run([input])
    const outputTensor = outputMap.values().next().value.data
    return outputTensor;
}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth/3*2) / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.setSize( window.innerWidth/2, window.innerHeight );
document.getElementById("dream").appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(20,10,25);
camera.lookAt(new THREE.Vector3(0,0,0));

// Material with better shading and contrast
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff, // Base color
  roughness: 1,  // Adjust for surface roughness
  metalness: 0,  // Non-metallic surface
  transparent: true,
  opacity: 0.9
});

for (let i = 0; i < 21; i++) {
    const box = new THREE.BoxGeometry( 1, 0.2, 1 );
    const cube = new THREE.Mesh( box, cubeMaterial );
    cube.receiveShadow = true;
    cube.castShadow = true;
    scene.add( cube );
}


// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );  


// Lights
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

let mid = new THREE.Vector3(0,0,0);

function updateCubeRotation(cube, plane) {
    switch (plane) {
      case 0: // No rotation
        cube.rotation.set(0, 0, 0); // Reset rotation to default (optional if needed)
        break;
      case 1: // Rotate around X-axis
        cube.rotation.set(Math.PI/2 + 0.01, 0, 0); // Increment rotation around X
        break;
      case 2: // Rotate around Z-axis
        cube.rotation.set(Math.PI/2, 0, Math.PI/2); // Increment rotation around Z
        break;
    }
  }

// dynamical resizing
window.addEventListener('resize', function()
{
  var width = window.innerWidth/2;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

async function animate() {
    const slidX = document.getElementById("sliderX").innerHTML
    const slidY = document.getElementById("sliderY").innerHTML
    const slidZ = document.getElementById("sliderZ").innerHTML


    const input = new onnx.Tensor(new Float32Array([slidX,slidY,slidZ]), "float32", [1,3]);
    let geo = await decode(input);

    // console.log(geo);
    const centers = [];

    for (let i = 0; i < 21; i++) {
        // decode all the info
        let ind = i+i*6;
        let x = geo[ind];
        let y = geo[ind+1];
        let z = geo[ind+2];
        let plane = parseInt(Math.round(geo[ind+3]));
        let width = geo[ind+4];
        let height = geo[ind+5];
        const max = 2.5
        if (plane !== 0 && height > max) {
            height = max;
        }

        updateCubeRotation(scene.children[i], plane)
        scene.children[i].position.x = x
        scene.children[i].position.y = z
        scene.children[i].position.z = y
        scene.children[i].scale.x = width*2
        scene.children[i].scale.z = height*2
        centers.push(x, y, z);
    }


    const bounding = new THREE.BufferGeometry();
    bounding.setAttribute( 'position', new THREE.Float32BufferAttribute( centers, 3 ) );
    bounding.computeBoundingBox();
    const points = new THREE.Points( bounding );
    mid = getCenterPoint(points);
    
    for (let i = 0; i < 21; i++) {
        let ind = i+i*6;
        scene.children[i].position.x -= mid.x
        scene.children[i].position.y -= mid.y
        scene.children[i].position.z -= mid.z
    }

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();