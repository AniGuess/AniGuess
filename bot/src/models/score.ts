import { User } from "discord.js";

export class Score {
    constructor(user: User, score: number) {
        this.user = user;
        this.score = score;
    }

    user: User;
    score: number;
}

export var score: Score[] = [];