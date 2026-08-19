import * as THREE from 'three';
import gsap from 'gsap';

export function createCube(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    return cube;
}
export function setCubeColor(cube: THREE.Mesh | null, color: THREE.ColorRepresentation) {
    if (!cube) return;
    const material = cube?.material as THREE.MeshStandardMaterial;
    material.color.set(color);
}
export function rotateCube(cube: THREE.Mesh) {
    gsap.to(cube.rotation, {
        y: cube.rotation.y + Math.PI / 2,
        duration: 0.5,
        ease: 'power2.out'
    })
}
