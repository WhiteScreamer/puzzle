import * as THREE from 'three';
import gsap from 'gsap';
import { InteractObject } from './base/interact-object';

export class Cube implements InteractObject {
    private geometry = new THREE.BoxGeometry(1, 1, 1);
    private material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    public mesh!: THREE.Mesh;
    constructor() {
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
    setColor(color: THREE.ColorRepresentation) {
        this.material.color.set(color);
    }
}
// export function rotateCube(cube: THREE.Mesh) {
//     gsap.to(cube.rotation, {
//         y: cube.rotation.y + Math.PI / 2,
//         duration: 0.5,
//         ease: 'power2.out'
//     })
// }
