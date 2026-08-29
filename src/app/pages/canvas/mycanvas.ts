import { AfterViewInit, Component, effect, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { createCamera, createRenderer, createScene, disposeRenderer, initLight, renderRenderer } from './environment';
import { EventProvider } from './event-provider';
import { Cube } from './cube';
import { AnimationProvider } from './animation-provider';
import { CUBE_SIZE, EDGE_SIZE } from './base/constants';
import { Board } from './board';
import { Game } from './game';

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
  private game!: Game;
  constructor() {
    effect(() => {
      //(this.eventProvider.hoveredObject() as Cube)?.setColor(0xff0000);
      //(this.eventProvider.leftObject() as Cube)?.setColor(0x0000ff);
      if (this.eventProvider.clickedObject()) {
        const cube = this.eventProvider.clickedObject() as Cube;
        this.game.move(cube, 0.5);
      }
    });
  }
  ngAfterViewInit(): void {
    this.scene = createScene();
    const camera = createCamera(this.width, this.height);
    initLight(this.scene);
    this.renderer = createRenderer(this.width, this.height);
    renderRenderer(this.renderer, this.container, this.scene, camera);
    this.game = new Game(this.scene, 3, 2);
    this.eventProvider.addEventListner(this.container, camera, this.game.cubes);
  }
  ngOnDestroy(): void {
    disposeRenderer(this.renderer);
  }
}
