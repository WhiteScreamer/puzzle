import { SHUFLE_COUNT, SHUFLE_ITER_DURATION } from "./constants";
import { Cube } from "./cube";
import { Directions, Game, GameModes } from "./game";
import seedrandom from 'seedrandom';

export class Shufle {
    private rng!: seedrandom.PRNG;
    private prevCube: Cube | null = null;
    private shufleMovigCounter=0;
    constructor(public game: Game) {
        //this.rng = seedrandom('my-unique-seed-string');
        this.rng = seedrandom(Date.now().toString());
    }
    public shufleStart(){
        this.prevCube=null;
        this.shufleMovigCounter=SHUFLE_COUNT;
        this.game.mode.set(GameModes.shuffle);
        this.shufleIteration();
    }
    public shufleIteration() {
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
        const rnd=this.rng();
        const cubeIndex = Math.round(rnd * (stack.length - 1));
        const movingCube = stack[cubeIndex];
        this.game.move(movingCube, SHUFLE_ITER_DURATION);
        this.prevCube = movingCube;
        this.shufleMovigCounter--;
    }
}