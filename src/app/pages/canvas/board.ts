import * as THREE from 'three';
import { BORDER_PERC, CUBE_SIZE } from './base/constants';
import { Cube } from './cube';

export class Board {
    private color = 0x999999;
    public width!: number;
    public height!: number;
    public borderWidth = CUBE_SIZE * BORDER_PERC;
    private initMesh(scene: THREE.Scene, colsCount: number, rowsCount: number) {
        const cubPlusBorder = CUBE_SIZE + this.borderWidth;
        this.width = cubPlusBorder * colsCount;
        this.height = cubPlusBorder * rowsCount;
        const geometry = new THREE.PlaneGeometry(this.width, this.height);
        const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: this.color }));
        scene.add(mesh);
        mesh.position.z -= CUBE_SIZE / 2;
    }
    constructor(scene: THREE.Scene, colsCount: number, rowsCount: number) {
        this.initMesh(scene, colsCount, rowsCount);
    }
}