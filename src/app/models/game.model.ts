import { GameStatus } from "../constants/game-status.type";

export class Game {
    GameId: number;
    NoOfQuestions: number;
    Status: GameStatus;
    WinerId?: number;

    constructor ( noOfQuestions: number ) {
        this.NoOfQuestions = noOfQuestions;
    }

}