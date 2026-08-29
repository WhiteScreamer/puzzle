import * as THREE from 'three';
import seedrandom from 'seedrandom';
import { CUBE_SIZE, EDGE_SIZE } from './base/constants';
import { ColorCodes, Cube } from './cube';
import { Board } from './board';
import { AnimationProvider, calcPointFunc } from './animation-provider';
import { MovingProvider } from './moving-privider';
export class Game {
    public cubes: Cube[] = [];
    public board!: Board;
    public hole!: THREE.Vector3;
    public movingProv!: MovingProvider;
    private rng!: seedrandom.PRNG;
    constructor(public scene: THREE.Scene, public colsCount: number, public rowsCount: number) {
        this.board = new Board(scene, colsCount, rowsCount);
        this.generateCubes();
        this.movingProv = new MovingProvider(scene, CUBE_SIZE + this.board.borderWidth);
        this.rng = seedrandom('my-unique-seed-string');
    }
    private generateCubes() {
        for (let col = 0; col < this.colsCount; col++) {
            for (let row = 0; row < this.rowsCount; row++) {
                const x = this.board.borderWidth / 2 + CUBE_SIZE / 2 + CUBE_SIZE * col + this.board.borderWidth * col - this.board.width / 2;
                const y = this.board.height / 2 - CUBE_SIZE * row - this.board.borderWidth * row - CUBE_SIZE / 2 - this.board.borderWidth / 2;
                const pinPoint = new THREE.Vector3(x, y, 0);
                if (row == this.rowsCount - 1 && col == this.colsCount - 1) {
                    this.hole = pinPoint;
                    break;
                }
                const cube = new Cube(this.scene);
                cube.group.position.copy(pinPoint);
                this.cubes.push(cube);
            }
        }
    }
    private getColorByCube(cube: Cube): ColorCodes {
        const colorIndex = cube.meshes.map(m => m.position.z).reduce((maxIndex, z, index, arr) => (z < arr[maxIndex] ? maxIndex : index), 0);
        return cube.colors[colorIndex];
    }
    //moving
    move(cube: Cube, duration: number) {
        const position = cube.group.position;
        const xDist = this.hole.x - position.x;
        const yDist = this.hole.y - position.y;
        const xDistAbs = Math.abs(xDist);
        const yDistAbs = Math.abs(yDist);
        if (xDistAbs > 0 && yDistAbs > 0) return;
        if (xDistAbs > this.movingProv.shiftMove) return;
        if (yDistAbs > this.movingProv.shiftMove) return;
        this.hole = position.clone();
        if (xDist > 0) this.movingProv.turnLeft(cube, duration);
        if (xDist < 0) this.movingProv.turnRight(cube, duration);
        if (yDist > 0) this.movingProv.turnUp(cube, duration);
        if (yDist < 0) this.movingProv.turnDown(cube, duration);
    }
    // shufle() {
    //     const beforeCode = -1;
    //     for (let i = 0; i < 100; i++) {
    //         const moveCode = Math.trunc(this.rng() * 3);
    //         if (beforeCode == moveCode) {
    //             i--;
    //             continue;
    //         }
    //         switch (moveCode) {
    //             case 0: this.movingProv.turnDown()
    //                 break;
    //         }
    //     }
    // }
}