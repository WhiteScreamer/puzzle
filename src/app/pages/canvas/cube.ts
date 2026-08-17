import * as THREE from 'three';
import gsap from 'gsap';

export function createCube(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x4f46e5 });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}

export function rotateCube(cube:THREE.Mesh){
    gsap.to(cube.rotation,{
        y:cube.rotation.y+Math.PI/2,
        duration:0.5,
        ease:'power2.out'
    })
}
