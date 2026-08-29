import * as THREE from 'three';
import gsap from 'gsap';
import { InteractObject } from './base/interact-object';
import { PositionProvider } from './position-provider';
import { CUBE_SIZE, EDGE_DEPTH_PERC, EDGE_SIZE } from './base/constants';

export enum ColorCodes {
    red = 1,
    green = 2,
    orange = 3,
    blue = 4,
    white = 5,
    yellow = 6,
}
export const colorsDict = {
    [ColorCodes.red]: 0xff0000,
    [ColorCodes.green]: 0x00ff00,
    [ColorCodes.orange]: 0xff9900,
    [ColorCodes.blue]: 0x0000ff,
    [ColorCodes.white]: 0xffffff,
    [ColorCodes.yellow]: 0xffff00
}
export class Cube implements InteractObject {
    private posProv = new PositionProvider();
    colors: ColorCodes[] = [];
    meshes: THREE.Mesh[] = [];
    group!: THREE.Group;
    private createMesh(scene: THREE.Scene, color: ColorCodes, axis: THREE.Vector3, angle: number) {
        const geometry = new THREE.BoxGeometry(CUBE_SIZE * EDGE_SIZE, CUBE_SIZE * EDGE_SIZE, CUBE_SIZE * EDGE_DEPTH_PERC);
        const material = new THREE.MeshStandardMaterial({ color: colorsDict[color] });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.add(new THREE.Vector3(0, 0, EDGE_SIZE - EDGE_DEPTH_PERC / 2));
        this.posProv.rotate(scene, mesh, new THREE.Vector3(0, 0, 0), axis, angle);
        this.meshes.push(mesh);
        this.group.add(mesh);
        this.colors.push(color);
    }
    constructor(scene: THREE.Scene) {
        this.group = new THREE.Group();
        const yA = new THREE.Vector3(0, 1, 0);
        //front
        this.createMesh(scene, ColorCodes.green, yA, 0);
        //right
        this.createMesh(scene, ColorCodes.orange, yA, Math.PI / 2);
        //back
        this.createMesh(scene, ColorCodes.blue, yA, Math.PI);
        //left
        this.createMesh(scene, ColorCodes.red, yA, -Math.PI / 2);
        //up
        const xA = new THREE.Vector3(1, 0, 0);
        this.createMesh(scene, ColorCodes.white, xA, -Math.PI / 2);
        //down
        this.createMesh(scene, ColorCodes.yellow, xA, Math.PI / 2);
        scene.add(this.group);
    }
}
