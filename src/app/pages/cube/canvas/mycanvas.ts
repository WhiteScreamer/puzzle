import { AfterViewInit, Component, effect, inject, OnDestroy, viewChild } from '@angular/core';
import * as THREE from 'three';
import { createCamera, createRenderer, createScene, disposeRenderer, initLight, renderRenderer } from '../../../features/cube/environment';
import { EventProvider } from '../../../features/cube/event-provider';
import { Cube } from '../../../features/cube/cube';
import { Game, GameModes } from '../../../features/cube/game';
import { Menu, MenuEvents } from '../../../services/menu';
import { AnimationProvider } from '../../../features/cube/animation-provider';

@Component({
  selector: 'app-mycanvas',
  imports: [],
  templateUrl: 'mycanvas.html',
  styleUrl: 'mycanvas.scss',
})
export class MyCanvas implements AfterViewInit, OnDestroy {
  private menu = inject(Menu);
  canvasContainer = viewChild.required<HTMLDivElement>("canvasContainer");
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private eventProvider = new EventProvider();
  private animationProv = new AnimationProvider()
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
        if (this.game?.mode() == GameModes.starting) {
          if (this.animationProv.animationProcessing()) {
            this.animationProv.finishQuickly();
          } else {
            const cube = this.eventProvider.clickedObject() as Cube;
            this.game.move(cube, 0.5);
          }
        }
      }
    });
    effect(() => {
      switch (this.menu.menuEventValue()) {
        case MenuEvents.shufle:
          this.game.shufle.shufleStart();
          break;
      }
      this.menu.menuEventValue.set(MenuEvents.none);
    });
    effect(() => {
      if (!this.animationProv.animationProcessing()) {
        switch (this.game?.mode()) {
          case GameModes.shuffle:
            this.game.shufle.shufleIteration();
            break;
          case GameModes.starting:
            this.game.checkWin();
            break;
          case GameModes.win:
            alert("Win!");
            this.game.mode.set(GameModes.init);
            break;
        }
      }
    });
  }
  ngAfterViewInit(): void {
    this.scene = createScene();
    const camera = createCamera(this.width, this.height);
    initLight(this.scene);
    this.renderer = createRenderer(this.width, this.height);
    renderRenderer(this.renderer, this.container, this.scene, camera);
    this.game = new Game(this.scene, 3, 2, this.animationProv);
    this.eventProvider.addEventListner(this.container, camera, this.game.cubes);
  }
  ngOnDestroy(): void {
    disposeRenderer(this.renderer);
  }
}
