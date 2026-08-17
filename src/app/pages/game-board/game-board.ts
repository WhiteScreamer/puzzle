import { Component } from '@angular/core';
import { MyCanvas } from "../canvas/mycanvas";

@Component({
  selector: 'app-game-board',
  imports: [MyCanvas],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss',
})
export class GameBoard {

}
