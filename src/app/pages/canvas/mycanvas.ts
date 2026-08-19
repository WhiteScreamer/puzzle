import { AfterViewInit, Component, effect, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { createCamera, createRenderer, createScene, disposeRenderer, initLight, renderRenderer } from './environment';
import { EventProvider } from './event-provider';
import { Cube } from './cube';

@Component({
  selector: 'app-mycanvas',
  imports: [],
  templateUrl: 'mycanvas.html',
  styleUrl: 'mycanvas.scss',
})
export class MyCanvas implements AfterViewInit, OnDestroy {
  canvasContainer = viewChild.required<HTMLDivElement>("canvasContainer");
  private renderer!: THREE.WebGLRenderer;
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
    effect(() => {
      (this.eventProvider.hoveredObject() as Cube)?.setColor(0xff0000);
      (this.eventProvider.leftObject() as Cube)?.setColor(0x0000ff);
      (this.eventProvider.clickedObject() as Cube)?.setColor(0xffff00);
    });
  }
  ngAfterViewInit(): void {
    const scene = createScene();
    const camera = createCamera(this.width, this.height);
    initLight(scene);
    const cubes = [new Cube()];
    cubes.forEach(cube => scene.add(cube.mesh));
    this.renderer = createRenderer(this.width, this.height);
    renderRenderer(this.renderer, this.container, scene, camera);
    this.eventProvider.addEventListner(this.container, camera, cubes);
  }
  ngOnDestroy(): void {
    disposeRenderer(this.renderer);
  }
}
