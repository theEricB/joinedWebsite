import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { latentCoordinates } from './latent_coordinates.js'
import { dataset } from './dataset.js'

const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera( 40, (window.innerWidth/3) / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/3, window.innerHeight );
document.getElementById("latentSpace").appendChild( renderer.domElement );
const controls2 = new OrbitControls( camera2, renderer.domElement );

camera2.position.set(-4,2,2);
camera2.lookAt(new THREE.Vector3(0,0,0));


const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];

const color = new THREE.Color();
const m = new THREE.MeshBasicMaterial( { color: 0xff00ff } ); 
scene2.add( new THREE.AmbientLight( 0xaaaaaa, 1 ) );
let scale = 100
for ( let i = 0; i < 400; i ++ ) {
    if (i < 100){
        color.setRGB( 230/255, 100/255, 30/255, THREE.SRGBColorSpace );
    } else if(i < 200){
        color.setRGB( 90/255, 160/255, 230/255, THREE.SRGBColorSpace );
    } else if(i < 300){
        color.setRGB( 100/255, 190/255, 30/255, THREE.SRGBColorSpace );
    } else {
        color.setRGB( 240/255, 190/255, 30/255, THREE.SRGBColorSpace );
    }
    colors.push( color.r, color.g, color.b );

    // positions
    const x = latentCoordinates[i][0];
    const y = latentCoordinates[i][1];
    const z = latentCoordinates[i][2];
    positions.push( x, y, z );
    let geos = dataset[i]
    for ( let j = 0; j < 21 ; j ++ ) {
        let geo = geos[j]
        let x1 = geo[0];
        let y1 = geo[1];
        let z1 = geo[2];
        let plane = parseInt(Math.round(geo[3]));
        let width = geo[4];
        let height = geo[5];
        const max = 2.5
        if (plane !== 0 && height > max) {
            height = max;
        }
        const box = new THREE.BoxGeometry( 1, 0.05, 1 );
        const cube = new THREE.Mesh( box, m );
        cube.position.x = x1 + x*scale
        cube.position.y = z1 + z*scale
        cube.position.z = y1 + y*scale
        cube.scale.x = width*2
        cube.scale.z = height*2

        if(plane == 1){
            cube.rotation.x = Math.PI/2
        }
        if(plane == 2){
            cube.rotation.z = Math.PI/2
            cube.rotation.x = Math.PI/2
        }

        scene2.add( cube );

    }
}

const lp = new THREE.SphereGeometry(.02, 6, 4); 
const lpm = new THREE.MeshBasicMaterial( { color: 0xff00ff } ); 
const sphere = new THREE.Mesh( lp, lpm ); 
scene2.add( sphere );

function animate() {
    const slidX = document.getElementById("sliderX").value;
    const slidY = document.getElementById("sliderY").value;
    const slidZ = document.getElementById("sliderZ").value;
    
    sphere.position.x = (slidX-.5);
    sphere.position.z = (slidZ-.5);
    sphere.position.y = (slidY-.5);

    requestAnimationFrame( animate );
    renderer.render( scene2, camera2 );
}
animate();