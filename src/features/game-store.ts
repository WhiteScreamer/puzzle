import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { GameState, MoveDirection } from "./game-state";

export const GameStore = signalStore(
  withState({
    cells: [],
    moves: []
  } as GameState),
  withMethods((store) => ({
    makeMove(direction: MoveDirection) {
      var moves = store.moves();
      moves.push(direction);
      patchState(store, {
        moves: moves
      });
    }
  }))
);