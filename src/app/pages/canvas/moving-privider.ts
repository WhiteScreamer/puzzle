import * as THREE from 'three';
import { CUBE_SIZE, EDGE_SIZE } from './base/constants';
import { AnimationProvider, calcPointFunc } from './animation-provider';
import { Cube } from './cube';
export class MovingProvider{
    private animation = new AnimationProvider()
    constructor(public scene: THREE.Scene,public shiftMove: number){
    }
    private turn(cube: Cube, axis: THREE.Vector3, turnPointFunc: calcPointFunc, targetPointFunc: calcPointFunc, clockWise: boolean, duration: number) {
        const position = cube.group.position;
        console.log(`${position.x}, ${position.y}, ${position.z}`);
        this.animation.animate({
            axis: axis,
            turnPointFunc: turnPointFunc,
            targetPointFunc: targetPointFunc,
            duration: duration,
            obj: cube,
            scene: this.scene,
            targetAngle: (clockWise ? -1 : 1) * Math.PI / 2,
            animationFuncName: "power1.in"
            //animationFuncName: "bounce.out"
        });
        if (this.animation.finishedAnimatonObject()) {

        }
    }
    public turnLeft(cube: Cube, duration:number) {
        this.turn(
            cube,
            new THREE.Vector3(0, 1, 0),
            (position: THREE.Vector3) => new THREE.Vector3(position.x + this.shiftMove / 2, position.y, position.z - CUBE_SIZE / 2),
            (position: THREE.Vector3) => new THREE.Vector3(position.x + this.shiftMove, position.y, position.z),
            false,
            duration
        );
    }
    public turnRight(cube: Cube, duration:number) {
        this.turn(
            cube,
            new THREE.Vector3(0, 1, 0),
            (position: THREE.Vector3) => new THREE.Vector3(position.x - this.shiftMove / 2, position.y, position.z - CUBE_SIZE / 2),
            (position: THREE.Vector3) => new THREE.Vector3(position.x - this.shiftMove, position.y, position.z),
            true,
            duration
        );
    }
    public turnUp(cube: Cube, duration:number) {
        this.turn(
            cube,
            new THREE.Vector3(1, 0, 0),
            (position: THREE.Vector3) => new THREE.Vector3(position.x, position.y + this.shiftMove / 2, position.z - CUBE_SIZE / 2),
            (position: THREE.Vector3) => new THREE.Vector3(position.x, position.y + this.shiftMove, position.z),
            true,
            duration
        );
    }
    public turnDown(cube: Cube, duration:number) {
        this.turn(
            cube,
            new THREE.Vector3(1, 0, 0),
            (position: THREE.Vector3) => new THREE.Vector3(position.x, position.y - this.shiftMove / 2, position.z - CUBE_SIZE / 2),
            (position: THREE.Vector3) => new THREE.Vector3(position.x, position.y - this.shiftMove, position.z),
            false,
            duration
        );
    }
}