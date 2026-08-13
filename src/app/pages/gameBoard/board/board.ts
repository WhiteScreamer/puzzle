import { AfterViewInit, Component, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { createCube } from './cube';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements AfterViewInit, OnDestroy {
  canvasContainer = viewChild.required<HTMLDivElement>("canvasContainer");
  private renderer!:THREE.WebGLRenderer;
  private initLight(scene:THREE.Scene) {
    const ambientLight=new THREE.AmbientLight(0xffffff,0.7);
    scene.add(ambientLight);
    const directionLight=new THREE.DirectionalLight(0xffffff,1);
    directionLight.position.set(5,5,5);
    scene.add(directionLight);
  }
  private get container(){
    return (this.canvasContainer() as any).nativeElement;
  }
  private get width(){
    return this.container.clientWidth;
  }
  private get height(){
    return this.container.clientHeight;
  }
  private createRenderer():THREE.WebGLRenderer{
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.width, this.height);
    this.container.append(renderer.domElement);
    return renderer;
  }
  private createScene(): THREE.Scene {
    const scene = new THREE.Scene();
    return scene;
  }
  private createCamera():THREE.PerspectiveCamera{
    const camera = new THREE.PerspectiveCamera(90, this.width / this.height, 0.1, 1000);
    camera.position.z = 3;
    return camera;
  }
  ngAfterViewInit(): void {
    const scene = this.createScene();
    const camera=this.createCamera();
    this.initLight(scene);
    const cube = createCube()
    scene.add(cube);
    this.renderer=this.createRenderer();
    this.renderer.render(scene,camera);
  }
  ngOnDestroy(): void {
    if(this.renderer){
      this.renderer.dispose();
      this.renderer.domElement.remove();
    }
  }
}
