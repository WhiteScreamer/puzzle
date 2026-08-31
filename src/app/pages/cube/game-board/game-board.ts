import { Component, inject } from '@angular/core';
import { MyCanvas } from "../canvas/mycanvas";
import { Menu, MenuEvents } from '../../../services/menu';

@Component({
  selector: 'app-game-board',
  imports: [MyCanvas],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss',
})
export class GameBoard {
  menu=inject(Menu);
  shufle() {
    this.menu.menuEventValue.set(MenuEvents.shufle);
  }
}
