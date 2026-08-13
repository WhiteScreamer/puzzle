import { Component } from '@angular/core';
import { Board } from "../gameBoard/board/board";

@Component({
  selector: 'app-game-board',
  imports: [Board],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss',
})
export class GameBoard {

}
