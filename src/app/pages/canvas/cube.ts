import * as THREE from 'three';
import gsap from 'gsap';
import { InteractObject } from './base/interact-object';
import { PositionProvider } from './position-provider';

export enum Colors {
    red = 0xff0000,
    green = 0x00ff00,
    orange = 0xff9900,
    blue = 0x0000ff,
    white = 0xffffff,
    yellow = 0xffff00,
}

export class Cube implements InteractObject {
    private posProv = new PositionProvider();
    private geometry = new THREE.BoxGeometry(0.5, 0.5, 0.25);
    meshes: THREE.Mesh[] = [];
    group!: THREE.Group;
    private createMesh(scene:THREE.Scene,color:number, axis:THREE.Vector3,angle:number){
        const material=new THREE.MeshStandardMaterial({ color: color });
        const mesh = new THREE.Mesh(this.geometry.clone(), material);
        mesh.position.add(new THREE.Vector3(0, 0, 0.5 - 0.25/2));
        this.posProv.rotate(scene,mesh,new THREE.Vector3(0,0,0),axis,angle);
        this.meshes.push(mesh);
    }
    constructor(scene: THREE.Scene) {
        this.group = new THREE.Group();
        const yA=new THREE.Vector3(0,1,0);
        //front
        this.createMesh(scene,Colors.green,yA,0);
        //right
        this.createMesh(scene,Colors.orange,yA,Math.PI/2);
        //back
        this.createMesh(scene,Colors.blue,yA,Math.PI);
        //left
        this.createMesh(scene,Colors.red,yA,-Math.PI/2);
        //up
        const xA=new THREE.Vector3(1,0,0);
        this.createMesh(scene,Colors.white,xA,-Math.PI/2);
        //down
        this.createMesh(scene,Colors.yellow,xA,Math.PI/2);
        for(const mesh of this.meshes){
            this.group.add(mesh);
        }
        scene.add(this.group);
    }
}
