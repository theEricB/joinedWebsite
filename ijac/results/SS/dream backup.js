function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;
    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
    mesh.localToWorld( middle );
    return middle;
}

async function decode(input, modelname) {
    const sess = new onnx.InferenceSession()
    await sess.loadModel(modelname)
    const outputMap = await sess.run([input])
    const outputTensor = outputMap.values().next().value.data
    return outputTensor;
}

async function decode_with_num_nodes(input, modelname) {
  const sess = new onnx.InferenceSession();
  await sess.loadModel(modelname);

  // Run the model with the input
  const outputMap = await sess.run([input]);

  // Extract all outputs by their keys or iterate through the map
  const outputs = Array.from(outputMap.values()).map(tensor => tensor.data);

  // console.log(outputs); // Logs an array of output tensors
  return outputs; // Return both outputs as an array
}

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth/5*3) / window.innerHeight*1.3, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.setSize( window.innerWidth/5*3, window.innerHeight/5*4 );
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
  var width = window.innerWidth/5*3;
  var height = window.innerHeight/5*4;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});


// USE KEYS TO CHANGE SLIDER VALUES

let intervalId = null; // To track the active interval
let adjustmentSpeed = 0.003; // Initial adjustment speed
let heldKey = null; // To track the currently held key

function updateValueStart(event) {
  const key = event.key.toLowerCase();
  
  // Prevent multiple intervals for the same key
  if (key === heldKey) return;

  // Track the held key
  heldKey = key;

  const sliderX = document.getElementById("sliderX");
  const sliderY = document.getElementById("sliderY");
  const sliderZ = document.getElementById("sliderZ");

  // Reset the adjustment speed on a new keypress
  adjustmentSpeed = 0.003;

  // Define the update logic
  function updateSlider() {
    switch (key) {
      case "q":
        sliderX.value = parseFloat(sliderX.value) - adjustmentSpeed;
        break;
      case "e":
        sliderX.value = parseFloat(sliderX.value) + adjustmentSpeed;
        break;
      case "a":
        sliderZ.value = parseFloat(sliderZ.value) - adjustmentSpeed;
        break;
      case "d":
        sliderZ.value = parseFloat(sliderZ.value) + adjustmentSpeed;
        break;
      case "y":
        sliderY.value = parseFloat(sliderY.value) - adjustmentSpeed;
        break;
      case "c":
        sliderY.value = parseFloat(sliderY.value) + adjustmentSpeed;
        break;
    }

    // Gradually increase the adjustment speed
    adjustmentSpeed = Math.min(adjustmentSpeed + 0.001, 0.05); // Cap speed at 0.05
  }

  // Start an interval to repeatedly update the value
  intervalId = setInterval(updateSlider, 50); // Adjust every 50ms
}

function updateValueStop(event) {
  const key = event.key.toLowerCase();

  // Stop the interval only if the released key matches the held key
  if (key === heldKey) {
    clearInterval(intervalId);
    intervalId = null;
    heldKey = null;
    adjustmentSpeed = 0.003; // Reset speed for the next keypress
  }
}

// Attach event listeners for keydown and keyup
document.addEventListener("keydown", updateValueStart);
document.addEventListener("keyup", updateValueStop);


let selector = document.getElementById("modelSelector");
let current_model = selector.value

selector.addEventListener("change", function() {
  if(selector.value != current_model)
  {
    current_model = selector.value
    console.log("model changed to " + current_model);
  }
});

const max_num_nodes = 21;
let num_features;



async function animate() {
    const slidX = document.getElementById("sliderX").value
    const slidY = document.getElementById("sliderY").value
    const slidZ = document.getElementById("sliderZ").value

    const input = new onnx.Tensor(new Float32Array([slidX,slidY,slidZ]), "float32", [1,3]);


    let modelname = "results/" + current_model + ".onnx"
    let geo;
    let num_nodes;
    if(current_model == "thesis"){
      geo = await decode(input, modelname);
      num_nodes = 21;
      num_features = 6;
    } else if(current_model == "orthogonal"){
      [geo, num_nodes]  = await decode_with_num_nodes(input, modelname);
      num_nodes = parseInt(num_nodes[0]);
      num_features = 5;
    } else {
      [geo, num_nodes]  = await decode_with_num_nodes(input, modelname);
      num_nodes = parseInt(num_nodes[0]);
      num_features = 11;
    }  
    const centers = [];

    for (let i = 0; i < max_num_nodes; i++) {
        if (i >= num_nodes) {
            scene.children[i].visible = false;
            continue;
        } else {
          scene.children[i].visible = true;
        }
        // decode all the info
        let ind = i+i*num_features;
        let x = geo[ind];
        let y = geo[ind+1];
        let z = geo[ind+2];

        let plane = parseInt(Math.round(geo[ind+3]));
        let width = geo[ind+4];
        let height = geo[ind+5];
        const max = 3 
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
    
    for (let i = 0; i < max_num_nodes; i++) {
        scene.children[i].position.x -= mid.x
        scene.children[i].position.y -= mid.y
        scene.children[i].position.z -= mid.z
    }

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();