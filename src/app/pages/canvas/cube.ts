import * as THREE from 'three';
import gsap from 'gsap';
import { InteractObject } from './base/interact-object';
import { PositionProvider } from './position-provider';

export enum Colors {
    red = 0xff0000,
    green = 0x00ff00,
    orange = 0xffcc00,
    blue = 0x0000ff,
    white = 0xffffff,
    нуддщц = 0xffff00,
}

export class Cube implements InteractObject {
    private geometry = new THREE.BoxGeometry(0.75, 0.75, 0.25);
    private material = [
        new THREE.MeshStandardMaterial({ color: Colors.green }),
        new THREE.MeshStandardMaterial({ color: Colors.orange })
    ];
    meshes: THREE.Mesh[] = [];
    group!: THREE.Group;
    private createMesh(scene:THREE.Scene,materialIndex:number, axis:THREE.Vector3,angle:number){
        const mesh = new THREE.Mesh(this.geometry.clone(), this.material[materialIndex]);
        mesh.position.add(new THREE.Vector3(0, 0, 0.5 + 0.25 / 2));
        const posProv = new PositionProvider();
        posProv.rotate(scene,mesh,new THREE.Vector3(0,0,0),axis,angle);
        this.meshes.push(mesh);
    }
    constructor(scene: THREE.Scene) {
        this.group = new THREE.Group();
        const yA=new THREE.Vector3(0,1,0);
        //front green
        this.createMesh(scene,0,yA,0);
        //right orange
        this.createMesh(scene,1,yA,Math.PI/2);
        for(const mesh of this.meshes){
            this.group.add(mesh);
        }
        scene.add(this.group);
    }
}
