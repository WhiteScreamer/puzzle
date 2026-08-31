import { signal } from '@angular/core';
import * as THREE from 'three';
import { InteractObject } from '../base/interact-object';
export class EventProvider {
    readonly hoveredObject = signal<InteractObject | null>(null);
    readonly leftObject = signal<InteractObject | null>(null);
    readonly clickedObject = signal<InteractObject | null>(null);
    private raycaster = new THREE.Raycaster();
    private mousePosition = new THREE.Vector2();
    private container!: HTMLElement;
    private camera!: THREE.Camera;
    private checkedObjects!: InteractObject[];
    constructor() {
    }
    private updateMousePosition(e: MouseEvent) {
        const rect = this.container.getBoundingClientRect();
        //-1 to 1
        this.mousePosition.x = ((e.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
        this.mousePosition.y = -((e.clientY - rect.top) / this.container.clientHeight) * 2 + 1;
    }
    private getIntersection(): number {
        this.raycaster.setFromCamera(this.mousePosition, this.camera);
        const intersects = this.raycaster.intersectObjects(this.checkedObjects.flatMap(o=>o.meshes));
        if (intersects.length == 0) return -1;
        const intersectMesh=intersects[0].object as THREE.Mesh;
        for(let i=0;i<this.checkedObjects.length;i++){
            if(this.checkedObjects[i].meshes.indexOf(intersectMesh)>=0) return i;
        }
        return -1;
    }
    addEventListner(contaiter: HTMLElement, camera: THREE.Camera, checkedObjects: InteractObject[]) {
        this.container = contaiter;
        this.camera = camera;
        this.checkedObjects = checkedObjects;
        this.container.addEventListener('pointermove', (e) => {
            this.updateMousePosition(e);
            var newHoverObject = this.checkedObjects[this.getIntersection()];
            if (this.hoveredObject() == newHoverObject) return;
            this.leftObject.set(this.hoveredObject());
            this.hoveredObject.set(newHoverObject);
        });
        this.container.addEventListener('mousedown', (e) => {
            if (this.clickedObject() == this.hoveredObject()) return;
            this.clickedObject.set(this.hoveredObject());
        });
        this.container.addEventListener('mouseup', (e) => {
            this.clickedObject.set(null);
        })
    }
}