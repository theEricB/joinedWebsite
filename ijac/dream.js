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

// define Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Ambient light
const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x333333, 0.4); // Sky-ground light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
let mid = new THREE.Vector3(0,0,0);

// dynamical resizing
window.addEventListener('resize', function()
{
  var width = window.innerWidth/5*3;
  var height = window.innerHeight/5*4;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});


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

// Material with better shading and contrast
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff, // Base color
  roughness: 1,  // Adjust for surface roughness
  metalness: 0,  // Non-metallic surface
  transparent: true,
  opacity: 0.9
});

const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
// const material = new THREE.MeshPhongMaterial({
//   color: 0xffffff,          // White color
//   transparent: true,        // Enable transparency
//   opacity: 0.7,             // Slightly transparent (70% opaque)
//   side: THREE.DoubleSide,   // Render both sides of the surface
// });


const meshes = []; // Store references to the meshes
for (let i = 0; i < max_num_nodes; i++) {
  const geometry = new THREE.BufferGeometry();

  // Placeholder vertices (6 vertices for 2 triangles)
  const vertices1 = new Float32Array([
    0, 0, 0,   // Bottom-left corner
    10, 0, 0,   // Bottom-right corner
    0, 10, 0,   // Top-left corner
    0, 10, 0,   // Top-left corner
    10, 0, 0,   // Bottom-right corner
    10, 10, 0,   // Top-right corner
  ]);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices1, 3));

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;    // Allow the mesh to cast shadows
  mesh.receiveShadow = true;
  scene.add(mesh);
  meshes.push(mesh); // Store a reference for later updates
}

// add rest after so that loop works
scene.add(ambientLight);
scene.add(hemisphereLight);
scene.add(directionalLight);
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );  

function updateMeshesCornerpoints(geo, num_nodes, num_features, meshes, max_num_nodes) {
  for (let i = 0; i < max_num_nodes; i++) {
    const mesh = meshes[i]; // Access the initialized mesh

    if (i >= num_nodes) {
      // Hide unused meshes
      mesh.visible = false;
      continue;
    }

    mesh.visible = true; // Make sure the mesh is visible
    // Decode the vertices for this mesh
    const ind = i + i * num_features;
    const x1 = geo[ind], y1 = geo[ind + 1], z1 = geo[ind + 2];
    const x2 = geo[ind + 3], y2 = geo[ind + 4], z2 = geo[ind + 5];
    const x3 = geo[ind + 6], y3 = geo[ind + 7], z3 = geo[ind + 8];
    const x4 = geo[ind + 9], y4 = geo[ind + 10], z4 = geo[ind + 11];

    // Update the vertices array
    const vertices = new Float32Array([
      x1, z1, y1,
      x2, z2, y2,
      x3, z3, y3,
      x1, z1, y1,
      x3, z3, y3,
      x4, z4, y4,
    ]);

    // Access and update the mesh's geometry
    const position = mesh.geometry.attributes.position.array;
    for (let j = 0; j < vertices.length; j++) {
      position[j] = vertices[j];
    }

    // Mark the position attribute as needing an update
    mesh.geometry.attributes.position.needsUpdate = true;
  }
}

function updateMeshesOrthogonal(geo, num_nodes, num_features, meshes, max_num_nodes) {
  for (let i = 0; i < max_num_nodes; i++) {
    const mesh = meshes[i]; // Access the initialized mesh

    if (i >= num_nodes) {
      // Hide unused meshes
      mesh.visible = false;
      continue;
    }

    mesh.visible = true; // Make sure the mesh is visible
    // Decode the vertices for this mesh
    const ind = i + i * num_features;
    const x1 = geo[ind], y1 = geo[ind + 1], z1 = geo[ind + 2];
    const x2 = geo[ind + 3], y2 = geo[ind + 4], z2 = geo[ind + 5];
    

    // Update the vertices array
    const vertices = new Float32Array([
      x1, z1, y1,
      x2, z2, y2,
      x3, z3, y3,
      x1, z1, y1,
      x3, z3, y3,
      x4, z4, y4,
    ]);

    // Access and update the mesh's geometry
    const position = mesh.geometry.attributes.position.array;
    for (let j = 0; j < vertices.length; j++) {
      position[j] = vertices[j];
    }

    // Mark the position attribute as needing an update
    mesh.geometry.attributes.position.needsUpdate = true;
  }
}

async function animate() {
  const slidX = document.getElementById("sliderX").value
  const slidY = document.getElementById("sliderY").value
  const slidZ = document.getElementById("sliderZ").value

  const input = new onnx.Tensor(new Float32Array([slidX,slidY,slidZ]), "float32", [1,3]);

  // current_model = "cornerpoints"
  let modelname = "results/" + current_model + ".onnx"
  let geo;
  let num_nodes;
  if(current_model == "thesis"){
    geo = await decode(input, modelname);
    num_nodes = 21;
    num_features = 6;
    updateMeshesOrthogonal(geo, num_nodes, num_features, meshes, max_num_nodes);
  } else if(current_model == "orthogonal"){
    [geo, num_nodes]  = await decode_with_num_nodes(input, modelname);
    num_nodes = parseInt(num_nodes[0]);
    num_features = 5;
    updateMeshesOrthogonal(geo, num_nodes, num_features, meshes, max_num_nodes);
  } else {
    [geo, num_nodes]  = await decode_with_num_nodes(input, modelname);
    num_nodes = parseInt(num_nodes[0]);
    num_features = 11;
    updateMeshesCornerpoints(geo, num_nodes, num_features, meshes, max_num_nodes);
  } 
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();