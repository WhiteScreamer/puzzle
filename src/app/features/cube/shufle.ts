import { Cube } from "./cube";
import { Directions, Game, GameModes } from "./game";
import seedrandom from 'seedrandom';

export class Shufle {
    private rng!: seedrandom.PRNG;
    private prevCube: Cube | null = null;
    private shufleMovigCounter=0;
    constructor(public game: Game) {
        this.rng = seedrandom('my-unique-seed-string');
    }
    public shufleStart(){
        this.prevCube=null;
        this.shufleMovigCounter=5;
        this.game.mode.set(GameModes.shuffle);
        this.shufle();
    }
    public shufle() {
        if(this.shufleMovigCounter<=0){
            this.game.mode.set(GameModes.starting);
            return;
        }
        let stack = [];
        for (let cub of this.game.cubes) {
            if (cub == this.prevCube) continue;
            const direction = this.game.getDirection(this.game.hole, cub.group.position);
            if (direction == Directions.toFar) continue;
            stack.push(cub)
        }
        const cubeIndex = Math.trunc(this.rng() * (stack.length - 1));
        const movingCube = stack[cubeIndex];
        this.game.move(movingCube, 0.5);
        this.prevCube = movingCube;
        this.shufleMovigCounter--;
    }
}