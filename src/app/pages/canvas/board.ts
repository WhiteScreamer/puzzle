import * as THREE from 'three';
import { BORDER_PERC, CUBE_SIZE } from './base/constants';
import { Cube } from './cube';

export class Board {
    private color = 0x999999;
    public cubes: Cube[] = [];
    private width!:number;
    private height!:number;
    private get borderWidth():number{
        return CUBE_SIZE*BORDER_PERC;
    }
    private initMesh(scene: THREE.Scene) {
        const cubPlusBorder = CUBE_SIZE + this.borderWidth;
        this.width = cubPlusBorder * this.colsCount;
        this.height = cubPlusBorder * this.rowsCount;
        const geometry = new THREE.PlaneGeometry(this.width, this.height);
        const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: this.color }));
        scene.add(mesh);
        mesh.position.z -= CUBE_SIZE / 2;
    }
    private generateCubes(scene: THREE.Scene) {
        for (let col = 0; col < this.colsCount; col++) {
            for (let row = 0; row < this.rowsCount; row++) {
                if(row==this.rowsCount-1 && col==this.colsCount-1) break;
                const cube = new Cube(scene,col,row);
                const x=this.borderWidth/2+ CUBE_SIZE/2+ CUBE_SIZE*col+this.borderWidth*col - this.width/2;
                const y=this.height/2-CUBE_SIZE*row-this.borderWidth*row-CUBE_SIZE/2-this.borderWidth/2;
                cube.group.position.set(x,y,0);
                this.cubes.push(cube);
            }
        }
    }

    constructor(scene: THREE.Scene, public colsCount: number, public rowsCount: number) {
        this.initMesh(scene);
        this.generateCubes(scene);
    }
}