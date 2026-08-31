import * as THREE from 'three';
import { ColorCodes, Cube } from './cube';
import { Board } from './board';
import { AnimationProvider, calcPointFunc } from './animation-provider';
import { MovingProvider } from './moving-privider';
import { CUBE_SIZE } from './constants';
import { signal } from '@angular/core';
import { Shufle } from './shufle';
export enum Directions {
    toFar, right, down, left, up
}
export enum GameModes {
    init,
    shuffle,
    starting
}
export class Game {
    public cubes: Cube[] = [];
    public board!: Board;
    public hole!: THREE.Vector3;
    public movingProv!: MovingProvider;
    public mode = signal<GameModes>(GameModes.init);
    public shufle!: Shufle;
    constructor(public scene: THREE.Scene, public colsCount: number, public rowsCount: number, animationProv:AnimationProvider) {
        this.board = new Board(scene, colsCount, rowsCount);
        this.generateCubes();
        this.movingProv = new MovingProvider(scene, CUBE_SIZE + this.board.borderWidth,animationProv);
        this.shufle = new Shufle(this);
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
                cube.id = this.cubes.length;
                this.cubes.push(cube);
            }
        }
    }
    private getColorByCube(cube: Cube): ColorCodes {
        const colorIndex = cube.meshes.map(m => m.position.z).reduce((maxIndex, z, index, arr) => (z < arr[maxIndex] ? maxIndex : index), 0);
        return cube.colors[colorIndex];
    }
    //moving
    public getDirection(pos1: THREE.Vector3, pos2: THREE.Vector3): Directions {
        let direction = Directions.toFar
        const xDist = pos1.x - pos2.x;
        const yDist = pos1.y - pos2.y;
        const xDistAbs = Math.abs(xDist);
        const yDistAbs = Math.abs(yDist);
        if (xDistAbs > 0 && yDistAbs > 0) return direction;
        if (xDistAbs > this.movingProv.shiftMove) return direction;
        if (yDistAbs > this.movingProv.shiftMove) return direction;
        if (xDist > 0) direction = Directions.left;
        if (xDist < 0) direction = Directions.right;
        if (yDist > 0) direction = Directions.up;
        if (yDist < 0) direction = Directions.down;
        return direction;
    }
    private moveToDirection(cube: Cube, duration: number, direction: Directions) {
        if (direction == Directions.toFar) return;
        this.hole = cube.group.position.clone();
        switch (direction) {
            case Directions.left: this.movingProv.turnLeft(cube, duration); break;
            case Directions.right: this.movingProv.turnRight(cube, duration); break;
            case Directions.up: this.movingProv.turnUp(cube, duration); break;
            case Directions.down: this.movingProv.turnDown(cube, duration); break;
        }
    }
    move(cube: Cube, duration: number) {
        const direction = this.getDirection(this.hole, cube.group.position);
        this.moveToDirection(cube, duration, direction);
    }
}