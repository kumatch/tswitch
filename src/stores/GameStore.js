'use strict';

import Marty from "marty";
import constants from "../constants/gameConstants";

class GameStore extends Marty.Store {
    constructor(options) {
        super(options);

        this.state = {
            top_games: []
        };
        this.handlers = {
            load:   constants.LOAD_TOP_GAMES
        };
    }

    load(top_games) {
        this.state.top_games = top_games;
        this.hasChanged();
    }

    getTopGames() {
        return this.state.top_games;
    }
}

export default Marty.register(GameStore, "GameStore");
