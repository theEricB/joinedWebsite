const latentCoordinates = [
[0.01, 0.94, 0.65],
[0.04, 0.73, 0.62],
[0.01, 0.9, 0.63],
[0.01, 0.98, 0.01],
[0.01, 0.78, 0.03],
[0.04, 0.73, 0.63],
[0.0, 0.99, 0.0],
[0.0, 1.0, 0.0],
[0.25, 0.8, 0.79],
[0.05, 0.73, 0.64],
[0.0, 1.0, 0.0],
[0.01, 0.98, 0.01],
[0.24, 0.79, 0.78],
[0.01, 0.92, 0.63],
[0.51, 0.77, 0.88],
[0.52, 0.78, 0.88],
[0.51, 0.98, 0.99],
[0.01, 0.93, 0.65],
[0.5, 0.78, 0.88],
[0.5, 0.79, 0.89],
[0.02, 0.86, 0.58],
[0.01, 0.93, 0.64],
[0.04, 0.72, 0.62],
[0.01, 0.91, 0.65],
[0.0, 1.0, 0.0],
[0.0, 0.8, 0.04],
[0.04, 0.73, 0.63],
[0.01, 0.92, 0.64],
[0.0, 0.99, 0.01],
[0.27, 0.76, 0.77],
[0.06, 0.73, 0.65],
[0.0, 0.99, 0.0],
[0.0, 1.0, 0.0],
[0.25, 0.79, 0.79],
[0.04, 0.73, 0.62],
[0.5, 0.79, 0.89],
[0.48, 0.78, 0.88],
[0.51, 0.98, 0.99],
[0.01, 0.94, 0.65],
[0.51, 0.77, 0.87],
[0.47, 0.75, 0.86],
[0.49, 0.97, 0.99],
[0.01, 0.93, 0.68],
[0.03, 0.72, 0.61],
[0.01, 0.94, 0.65],
[0.0, 1.0, 0.0],
[0.0, 0.79, 0.06],
[0.04, 0.72, 0.63],
[0.01, 0.95, 0.68],
[0.01, 0.97, 0.02],
[0.25, 0.79, 0.78],
[0.04, 0.72, 0.63],
[0.01, 0.98, 0.01],
[0.0, 1.0, 0.0],
[0.25, 0.79, 0.79],
[0.04, 0.73, 0.62],
[0.0, 1.0, 0.0],
[0.5, 0.77, 0.88],
[0.48, 0.97, 0.99],
[0.01, 0.94, 0.69],
[0.5, 0.77, 0.87],
[0.52, 0.79, 0.88],
[0.49, 0.97, 0.99],
[0.01, 0.77, 0.08],
[0.51, 0.77, 0.87],
[0.01, 0.95, 0.7],
[0.0, 0.99, 0.0],
[0.01, 0.77, 0.05],
[0.06, 0.73, 0.64],
[0.01, 0.93, 0.65],
[0.0, 0.99, 0.0],
[0.01, 0.78, 0.05],
[0.03, 0.72, 0.62],
[0.0, 0.99, 0.0],
[0.0, 0.99, 0.0],
[0.25, 0.8, 0.79],
[0.04, 0.73, 0.62],
[0.0, 0.99, 0.0],
[0.0, 1.0, 0.0],
[0.24, 0.79, 0.79],
[0.01, 0.94, 0.69],
[0.51, 0.78, 0.88],
[0.51, 0.8, 0.89],
[0.01, 0.94, 0.66],
[0.01, 0.78, 0.06],
[0.49, 0.78, 0.88],
[0.01, 0.94, 0.67],
[0.0, 0.98, 0.01],
[0.01, 0.77, 0.04],
[0.05, 0.73, 0.64],
[0.01, 0.93, 0.68],
[0.0, 0.98, 0.0],
[0.01, 0.78, 0.04],
[0.04, 0.74, 0.63],
[0.0, 0.99, 0.0],
[0.0, 0.99, 0.0],
[0.25, 0.78, 0.79],
[0.04, 0.73, 0.63],
[0.0, 1.0, 0.0],
[0.0, 0.99, 0.0],
[0.69, 0.65, 0.78],
[0.58, 0.66, 0.78],
[0.2, 0.55, 0.55],
[0.51, 0.48, 0.5],
[0.5, 0.48, 0.51],
[0.36, 0.52, 0.69],
[0.18, 0.56, 0.5],
[0.49, 0.48, 0.52],
[0.53, 0.47, 0.48],
[0.4, 0.55, 0.7],
[0.53, 0.63, 0.75],
[0.52, 0.47, 0.49],
[0.34, 0.47, 0.08],
[0.37, 0.56, 0.72],
[0.55, 0.64, 0.77],
[0.5, 0.48, 0.53],
[0.34, 0.47, 0.09],
[0.66, 0.63, 0.77],
[0.54, 0.64, 0.77],
[0.33, 0.47, 0.05],
[0.33, 0.47, 0.05],
[0.69, 0.65, 0.78],
[0.58, 0.66, 0.78],
[0.35, 0.47, 0.09],
[0.51, 0.48, 0.51],
[0.52, 0.48, 0.5],
[0.36, 0.52, 0.7],
[0.2, 0.55, 0.54],
[0.49, 0.48, 0.52],
[0.53, 0.49, 0.53],
[0.37, 0.51, 0.68],
[0.18, 0.56, 0.51],
[0.51, 0.48, 0.5],
[0.34, 0.47, 0.07],
[0.34, 0.53, 0.7],
[0.53, 0.62, 0.75],
[0.51, 0.49, 0.53],
[0.35, 0.47, 0.07],
[0.35, 0.52, 0.69],
[0.56, 0.64, 0.77],
[0.34, 0.47, 0.07],
[0.34, 0.47, 0.08],
[0.69, 0.65, 0.78],
[0.34, 0.54, 0.19],
[0.34, 0.47, 0.08],
[0.54, 0.63, 0.76],
[0.5, 0.48, 0.52],
[0.34, 0.53, 0.7],
[0.19, 0.55, 0.53],
[0.49, 0.48, 0.51],
[0.54, 0.47, 0.47],
[0.35, 0.52, 0.7],
[0.19, 0.55, 0.53],
[0.52, 0.47, 0.46],
[0.34, 0.47, 0.09],
[0.38, 0.53, 0.7],
[0.53, 0.63, 0.75],
[0.5, 0.47, 0.49],
[0.35, 0.47, 0.12],
[0.36, 0.53, 0.7],
[0.56, 0.65, 0.77],
[0.34, 0.47, 0.07],
[0.33, 0.47, 0.05],
[0.54, 0.63, 0.76],
[0.34, 0.54, 0.16],
[0.34, 0.47, 0.06],
[0.55, 0.64, 0.77],
[0.53, 0.61, 0.75],
[0.34, 0.55, 0.11],
[0.19, 0.55, 0.54],
[0.53, 0.48, 0.5],
[0.52, 0.47, 0.49],
[0.34, 0.53, 0.7],
[0.2, 0.55, 0.54],
[0.52, 0.47, 0.47],
[0.49, 0.48, 0.52],
[0.37, 0.51, 0.68],
[0.54, 0.62, 0.75],
[0.5, 0.47, 0.49],
[0.34, 0.47, 0.07],
[0.37, 0.55, 0.71],
[0.56, 0.65, 0.77],
[0.51, 0.47, 0.5],
[0.53, 0.62, 0.75],
[0.54, 0.64, 0.76],
[0.34, 0.54, 0.17],
[0.33, 0.47, 0.06],
[0.57, 0.65, 0.78],
[0.53, 0.62, 0.75],
[0.33, 0.55, 0.11],
[0.34, 0.47, 0.07],
[0.51, 0.48, 0.52],
[0.51, 0.48, 0.51],
[0.36, 0.52, 0.68],
[0.2, 0.55, 0.56],
[0.5, 0.48, 0.52],
[0.54, 0.47, 0.47],
[0.36, 0.51, 0.68],
[0.19, 0.55, 0.52],
[0.52, 0.48, 0.52],
[0.98, 0.71, 0.96],
[0.05, 0.36, 0.0],
[0.05, 0.0, 0.0],
[0.81, 0.48, 0.35],
[0.04, 0.0, 0.0],
[0.0, 0.23, 0.0],
[0.89, 0.57, 0.75],
[0.99, 0.72, 0.96],
[0.06, 0.0, 0.0],
[0.03, 0.0, 0.0],
[0.89, 0.57, 0.75],
[0.98, 0.7, 0.95],
[0.03, 0.0, 0.0],
[0.81, 0.48, 0.35],
[0.05, 0.36, 0.0],
[0.0, 0.23, 0.0],
[0.82, 0.48, 0.34],
[0.8, 0.48, 0.35],
[0.04, 0.35, 0.0],
[0.0, 0.23, 0.0],
[0.8, 0.48, 0.35],
[0.98, 0.71, 0.96],
[0.04, 0.35, 0.0],
[0.9, 0.58, 0.77],
[0.81, 0.48, 0.35],
[0.03, 0.0, 0.0],
[0.0, 0.22, 0.0],
[0.89, 0.58, 0.76],
[0.98, 0.71, 0.96],
[0.06, 0.0, 0.0],
[0.04, 0.0, 0.0],
[0.89, 0.58, 0.75],
[0.99, 0.71, 0.96],
[0.03, 0.0, 0.0],
[0.03, 0.0, 0.0],
[0.88, 0.57, 0.74],
[0.0, 0.23, 0.0],
[0.81, 0.48, 0.35],
[0.81, 0.48, 0.35],
[0.05, 0.36, 0.0],
[0.0, 0.24, 0.0],
[0.81, 0.48, 0.35],
[0.81, 0.48, 0.35],
[0.0, 0.22, 0.0],
[0.9, 0.59, 0.78],
[0.81, 0.48, 0.35],
[0.03, 0.0, 0.0],
[0.0, 0.24, 0.0],
[0.89, 0.58, 0.75],
[0.8, 0.48, 0.36],
[0.03, 0.0, 0.0],
[0.04, 0.0, 0.0],
[0.89, 0.57, 0.75],
[0.98, 0.71, 0.96],
[0.04, 0.0, 0.0],
[0.04, 0.0, 0.0],
[0.9, 0.58, 0.76],
[0.98, 0.7, 0.95],
[0.8, 0.48, 0.35],
[0.81, 0.48, 0.35],
[0.05, 0.35, 0.0],
[0.0, 0.23, 0.0],
[0.81, 0.48, 0.35],
[0.0, 0.22, 0.0],
[0.0, 0.22, 0.0],
[0.89, 0.57, 0.74],
[0.81, 0.48, 0.35],
[0.02, 0.0, 0.0],
[0.0, 0.23, 0.0],
[0.89, 0.58, 0.76],
[0.81, 0.48, 0.35],
[0.03, 0.0, 0.0],
[0.0, 0.23, 0.0],
[0.88, 0.58, 0.76],
[0.98, 0.71, 0.96],
[0.03, 0.0, 0.0],
[0.04, 0.0, 0.0],
[0.89, 0.58, 0.75],
[0.98, 0.71, 0.96],
[0.05, 0.0, 0.0],
[0.81, 0.48, 0.35],
[0.05, 0.36, 0.0],
[0.0, 0.23, 0.0],
[0.81, 0.48, 0.35],
[0.0, 0.23, 0.0],
[0.0, 0.24, 0.0],
[0.77, 0.45, 0.18],
[0.81, 0.48, 0.35],
[0.03, 0.0, 0.0],
[0.0, 0.23, 0.0],
[0.9, 0.58, 0.77],
[0.81, 0.48, 0.35],
[0.05, 0.0, 0.0],
[0.0, 0.22, 0.0],
[0.9, 0.58, 0.74],
[0.98, 0.71, 0.96],
[0.03, 0.0, 0.0],
[0.03, 0.0, 0.0],
[0.89, 0.57, 0.74],
[0.98, 0.71, 0.96],
[0.98, 0.34, 0.0],
[0.97, 0.36, 0.01],
[0.97, 0.16, 0.0],
[0.96, 0.01, 0.0],
[0.97, 0.0, 0.0],
[0.96, 0.51, 0.03],
[0.97, 0.52, 0.04],
[0.96, 0.01, 0.0],
[0.97, 0.01, 0.0],
[0.97, 0.52, 0.04],
[0.97, 0.5, 0.03],
[0.97, 0.14, 0.0],
[0.97, 0.0, 0.0],
[0.97, 0.34, 0.0],
[0.97, 0.52, 0.04],
[0.97, 0.15, 0.0],
[0.97, 0.0, 0.0],
[0.97, 0.34, 0.0],
[0.96, 0.36, 0.01],
[0.98, 0.13, 0.0],
[0.96, 0.17, 0.0],
[0.97, 0.35, 0.01],
[0.97, 0.34, 0.0],
[0.96, 0.15, 0.0],
[0.95, 0.35, 0.0],
[0.98, 0.0, 0.0],
[0.94, 0.51, 0.04],
[0.96, 0.52, 0.04],
[0.97, 0.01, 0.0],
[0.97, 0.0, 0.0],
[0.96, 0.51, 0.03],
[0.96, 0.51, 0.03],
[0.98, 0.15, 0.0],
[0.98, 0.0, 0.0],
[0.97, 0.35, 0.0],
[0.94, 0.5, 0.03],
[0.98, 0.17, 0.0],
[0.97, 0.0, 0.0],
[0.97, 0.34, 0.0],
[0.97, 0.51, 0.03],
[0.97, 0.16, 0.0],
[0.96, 0.16, 0.0],
[0.97, 0.36, 0.01],
[0.96, 0.14, 0.0],
[0.96, 0.17, 0.0],
[0.95, 0.36, 0.0],
[0.97, 0.35, 0.0],
[0.95, 0.49, 0.03],
[0.97, 0.51, 0.03],
[0.96, 0.01, 0.0],
[0.98, 0.0, 0.0],
[0.96, 0.51, 0.04],
[0.95, 0.5, 0.03],
[0.97, 0.0, 0.0],
[0.97, 0.0, 0.0],
[0.97, 0.34, 0.0],
[0.97, 0.5, 0.03],
[0.97, 0.14, 0.0],
[0.98, 0.0, 0.0],
[0.96, 0.36, 0.01],
[0.96, 0.51, 0.03],
[0.97, 0.15, 0.0],
[0.96, 0.18, 0.0],
[0.98, 0.33, 0.0],
[0.96, 0.14, 0.0],
[0.96, 0.15, 0.0],
[0.97, 0.34, 0.0],
[0.97, 0.36, 0.01],
[0.95, 0.15, 0.0],
[0.97, 0.52, 0.04],
[0.96, 0.01, 0.0],
[0.98, 0.0, 0.0],
[0.95, 0.5, 0.03],
[0.96, 0.52, 0.03],
[0.98, 0.0, 0.0],
[0.98, 0.0, 0.0],
[0.95, 0.51, 0.04],
[0.95, 0.48, 0.02],
[0.98, 0.14, 0.0],
[0.97, 0.01, 0.0],
[0.97, 0.35, 0.0],
[0.97, 0.52, 0.04],
[0.97, 0.17, 0.0],
[0.97, 0.0, 0.0],
[0.97, 0.36, 0.01],
[0.96, 0.14, 0.0],
[0.96, 0.18, 0.0],
[0.96, 0.34, 0.0],
[0.97, 0.35, 0.01],
[0.95, 0.16, 0.0],
[0.97, 0.14, 0.0],
[0.96, 0.36, 0.01],
[0.98, 0.0, 0.0],
[0.96, 0.5, 0.03],
[0.97, 0.5, 0.02],
[0.97, 0.0, 0.0],
[0.98, 0.0, 0.0],
[0.97, 0.52, 0.04],
[0.96, 0.51, 0.04],
[0.97, 0.16, 0.0]];



import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

for ( let i = 0; i < 400; i ++ ) {
    // positions
    const x = latentCoordinates[i][0];
    const y = latentCoordinates[i][1];
    const z = latentCoordinates[i][2];
    positions.push( x, y, z );
    // colors
    if (i < 100){
        color.setRGB( 0,1,0, THREE.SRGBColorSpace );
    } else if(i < 200){
        color.setRGB( 1,0,0, THREE.SRGBColorSpace );
    } else if(i < 300){
        color.setRGB( 0,0,1, THREE.SRGBColorSpace );
    } else {
        color.setRGB( 1,1,1, THREE.SRGBColorSpace );
    }
    colors.push( color.r, color.g, color.b );
}
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
geometry.computeBoundingSphere();
geometry.computeBoundingBox();
const material = new THREE.PointsMaterial( { size: .02, vertexColors: true } );

const points = new THREE.Points( geometry, material );
scene2.add( points );

points.position.x -= 0.5;
points.position.y -= 0.5;
points.position.z -= 0.5;

const box = new THREE.BoxHelper( points, 0x808080 );
scene2.add( box );

const lp = new THREE.SphereGeometry(.02, 6, 4); 
const lpm = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
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