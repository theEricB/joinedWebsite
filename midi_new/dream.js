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

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize( window.innerWidth/3*2, window.innerHeight );
document.getElementById("dream").appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(20,10,25);
camera.lookAt(new THREE.Vector3(0,0,0));

const cubeMaterial = new THREE.MeshLambertMaterial();
cubeMaterial.transparent = true
cubeMaterial.opacity = 0.8

// for (let i = 0; i < 21; i++) {
//     const box = new THREE.BoxGeometry( 1, 0.05, 1 );
//     const cube = new THREE.Mesh( box, material );
//     cube.receiveShadow = true;
//     cube.castShadow = true;
//     scene.add( cube );
// }

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );  



const light = new THREE.DirectionalLight( 0xddffdd, 2 );
light.position.set( 10, 10, 5 );
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

const d = 10;

light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;
light.shadow.camera.far = 1000;


let mid = new THREE.Vector3(0,0,0);


async function animate() {
    const slidX = document.getElementById("sliderX").value
    const slidY = document.getElementById("sliderY").value
    const slidZ = document.getElementById("sliderZ").value


    const input = new onnx.Tensor(new Float32Array([slidX,slidY,slidZ]), "float32", [1,3]);
    let geo = await decode(input);
    // console.log(geo);
    const centers = [];
    // DELETE SCENE
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        let obj = scene.children[i];
        scene.remove(obj); 
    }
    renderer.renderLists.dispose();

    // REESTABLISH SCENE
    scene.add( new THREE.AmbientLight( 0xaaaaaa, 0.6 ) );
    scene.add( light );
    for (let i = 0; i < 21; i++) {
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

        const box = new THREE.BoxGeometry( 1, 0.05, 1 );
        const cube = new THREE.Mesh( box, cubeMaterial );
        cube.position.x = x
        cube.position.y = z
        cube.position.z = y
        cube.scale.x = width*2
        cube.scale.z = height*2

        if(plane == 1){
            cube.rotation.x = Math.PI/2
        }
        if(plane == 2){
            cube.rotation.z = Math.PI/2
            cube.rotation.x = Math.PI/2
        }

        cube.receiveShadow = true;
        cube.castShadow = true;
        scene.add( cube );




        // if(plane == 1){
        //     scene.children[i].rotation.x = Math.PI/2
        // }
        // if(plane == 2){
        //     scene.children[i].rotation.z = Math.PI/2
        //     scene.children[i].rotation.x = Math.PI/2
        // }
        // scene.children[i].position.x = x
        // scene.children[i].position.y = z
        // scene.children[i].position.z = y

        // scene.children[i].scale.x = width*2
        // scene.children[i].scale.z = height*2

        centers.push(x, y, z);
        
    }


    const bounding = new THREE.BufferGeometry();
    bounding.setAttribute( 'position', new THREE.Float32BufferAttribute( centers, 3 ) );
    bounding.computeBoundingBox();
    const material = new THREE.PointsMaterial( {size: .05} );
    const points = new THREE.Points( bounding, material );
    mid = getCenterPoint(points);
    
    // for (let i = 0; i < 21; i++) {
    //     let ind = i+i*6;
    //     scene.children[i].position.x -= mid.x
    //     scene.children[i].position.y -= mid.y
    //     scene.children[i].position.z -= mid.z
    // }



    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();