import { GamePlayerQuestionMap } from "./game-player-question-map.model";

export class GamePlayerMap {
    GameId: number;
    PlayerId: number;
    PlayerName: string;
    Questions: GamePlayerQuestionMap[];
}