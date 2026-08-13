export enum GameCell{
    none,green,yellow,white,blue,red,orange
}
export enum MoveDirection{
    up,right,down,left
}
export interface  GameState{
    cells:GameCell[];
    moves:MoveDirection[];
}