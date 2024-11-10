import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



function createLineFromPoints(points, scene) {
    // Create an array to hold the vertices
    const vertices = [];

    // Loop through points and add them to vertices if extrusion is true
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point.extrusion) {
            vertices.push(new THREE.Vector3(point.x, point.y, point.z));
        }
    }

    // Create a geometry and set its vertices
    const geometry = new THREE.BufferGeometry().setFromPoints(vertices);

    // Create a line material (you can adjust color as needed)
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the line and add it to the scene
    const line = new THREE.Line(geometry, material);
    scene.add(line);
}



let scene, camera, renderer, mesh;

init();

function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( 4, 2, 4 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );
    scene.fog = new THREE.Fog( 0xa0a0a0, 4, 30 );

    //

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 0, 20, 10 );
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.bottom = - 2;
    directionalLight.shadow.camera.left = - 2;
    directionalLight.shadow.camera.right = 2;
    scene.add( directionalLight );

    // ground

    const ground = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xbbbbbb, depthWrite: false } ) );
    ground.rotation.x = - Math.PI / 2;
    ground.receiveShadow = true;
    scene.add( ground );

    const grid = new THREE.GridHelper( 40, 20, 0x000000, 0x000000 );
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add( grid );

    // export mesh (placeholder)

    const geometry = new THREE.TorusKnotGeometry( 0.75, 0.2, 200, 30 );
    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.position.y = 1.5;
    scene.add( mesh );

    // export gcode
    createLineFromPoints(window.path, scene);


    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    //

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 1.5, 0 );
    controls.update();

    //

    window.addEventListener( 'resize', onWindowResize );




}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    renderer.render( scene, camera );

}

