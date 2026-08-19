import { signal } from '@angular/core';
import * as THREE from 'three';
export class EventProvider {
    readonly hoveredObject = signal<THREE.Mesh | null>(null);
    readonly leftObject = signal<THREE.Mesh | null>(null);
    readonly clickedObject = signal<THREE.Mesh | null>(null);
    private raycaster = new THREE.Raycaster();
    private mousePosition = new THREE.Vector2();
    private container!: HTMLElement;
    private camera!: THREE.Camera;
    private checkedObjects!: THREE.Mesh[];
    constructor() {
    }
    private updateMousePosition(e: MouseEvent) {
        const rect = this.container.getBoundingClientRect();
        //-1 to 1
        this.mousePosition.x = ((e.clientX - rect.left) / this.container.clientWidth) * 2 - 1;
        this.mousePosition.y = -((e.clientY - rect.top) / this.container.clientHeight) * 2 + 1;
    }
    private getIntersection(): THREE.Mesh | null {
        this.raycaster.setFromCamera(this.mousePosition, this.camera);
        const intersects = this.raycaster.intersectObjects(this.checkedObjects);
        if (intersects.length == 0) return null;
        return intersects[0].object as THREE.Mesh;
    }
    addEventListner(contaiter: HTMLElement, camera: THREE.Camera, checkedObjects: THREE.Mesh[]) {
        this.container = contaiter;
        this.camera = camera;
        this.checkedObjects = checkedObjects;
        this.container.addEventListener('pointermove', (e) => {
            this.updateMousePosition(e);
            var newHoverObject = this.getIntersection();
            if (this.hoveredObject() == newHoverObject) return;
            this.leftObject.set(this.hoveredObject());
            this.hoveredObject.set(newHoverObject);
        });
        this.container.addEventListener('click', (e) => {
            if (this.clickedObject() == this.hoveredObject()) return;
            this.clickedObject.set(this.hoveredObject());
        })
    }
}