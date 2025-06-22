export class Player {
    PlayerId!: number;
    PlayerName!: string;
    Password?: string;
    JoinedOn?: Date;
    GamesWon?: number;

    constructor ( name: string, password: string ) {
        this.PlayerName = name;
        this.Password = password
    }


}