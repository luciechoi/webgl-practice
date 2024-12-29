import * as THREE from 'three'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

var container;
var camera, scene, renderer, clock;
var uniforms;

const init = () => {
    container = document.getElementById( 'container' );

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();
    clock = new THREE.Clock();

    var geometry = new THREE.PlaneGeometry( 2, 2 );

    uniforms = {
        u_time: new THREE.Uniform(1.0),
        u_resolution: new THREE.Uniform(new THREE.Vector2()),
        u_mouse: new THREE.Uniform(new THREE.Vector2())
    };

    var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    } );

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );

    container.appendChild( renderer.domElement );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );

    document.onmousemove = (e) => {
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
    }
}

const onWindowResize = (e) => {
    console.log("window resize", e);

    renderer.setSize( window.innerWidth, window.innerHeight );
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
}

const animate = () => {
    requestAnimationFrame( animate );
    render();
}

const render = () => {
    uniforms.u_time.value += clock.getDelta();
    renderer.render( scene, camera );
}


init();
animate();