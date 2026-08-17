import { AfterViewInit, Component, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { createCube } from './cube';
import { createCamera, createRenderer, createScene, disposeRenderer, initLight, renderRenderer } from './environment';

@Component({
  selector: 'app-mycanvas',
  imports: [],
  templateUrl: 'mycanvas.html',
  styleUrl: 'mycanvas.scss',
})
export class MyCanvas implements AfterViewInit, OnDestroy {
  canvasContainer = viewChild.required<HTMLDivElement>("canvasContainer");
  private renderer!:THREE.WebGLRenderer;

  private get container(){
    return (this.canvasContainer() as any).nativeElement;
  }
  private get width(){
    return this.container.clientWidth;
  }
  private get height(){
    return this.container.clientHeight;
  }
  ngAfterViewInit(): void {
    const scene = createScene();
    const camera=createCamera(this.width,this.height);
    initLight(scene);
    const cube = createCube()
    scene.add(cube);
    this.renderer=createRenderer(this.width,this.height);
    renderRenderer(this.renderer,this.container,scene,camera);
  }
  ngOnDestroy(): void {
    disposeRenderer(this.renderer);
  }
}
