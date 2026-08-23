import { AfterViewInit, Component, effect, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { createCamera, createRenderer, createScene, disposeRenderer, initLight, renderRenderer } from './environment';
import { EventProvider } from './event-provider';
import { Cube } from './cube';
import { AnimationProvider } from './animation-provider';

@Component({
  selector: 'app-mycanvas',
  imports: [],
  templateUrl: 'mycanvas.html',
  styleUrl: 'mycanvas.scss',
})
export class MyCanvas implements AfterViewInit, OnDestroy {
  canvasContainer = viewChild.required<HTMLDivElement>("canvasContainer");
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private eventProvider = new EventProvider();
  private get container() {
    return (this.canvasContainer() as any).nativeElement;
  }
  private get width() {
    return this.container.clientWidth;
  }
  private get height() {
    return this.container.clientHeight;
  }
  constructor() {
    const animation = new AnimationProvider()
    effect(() => {
      //(this.eventProvider.hoveredObject() as Cube)?.setColor(0xff0000);
      //(this.eventProvider.leftObject() as Cube)?.setColor(0x0000ff);
      if (this.eventProvider.clickedObject()) {
        const cube = this.eventProvider.clickedObject() as Cube;
        const position = cube.group.position;
        console.log(`${position.x}, ${position.y}, ${position.z}`);
        animation.animate({
          axis: new THREE.Vector3(0, 1, 0),
          turnPointFunc: (position:THREE.Vector3)=>new THREE.Vector3(position.x + 0.5, position.y, position.z - 0.5),
          targetPointFunc: (position:THREE.Vector3)=>new THREE.Vector3(position.x+1, position.y, position.z),
          duration: 2,
          obj: cube,
          scene: this.scene,
          targetAngle: Math.PI / 2
        });
      }
    });
  }
  ngAfterViewInit(): void {
    this.scene = createScene();
    const camera = createCamera(this.width, this.height);
    initLight(this.scene);
    const cubes = [new Cube(this.scene)];
    this.renderer = createRenderer(this.width, this.height);
    renderRenderer(this.renderer, this.container, this.scene, camera);
    this.eventProvider.addEventListner(this.container, camera, cubes);
  }
  ngOnDestroy(): void {
    disposeRenderer(this.renderer);
  }
}
