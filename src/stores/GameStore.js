'use strict';

import _ from "lodash";
import Marty from "marty";
import constants from "../constants/gameConstants";

class GameStore extends Marty.Store {
    constructor(options) {
        super(options);

        this.state = {
            top_games: {}
        };
        this.handlers = {
            load:   constants.LOAD_TOP_GAMES
        };
    }

    load(top_games) {
        top_games.forEach((top_game) => {
            console.log(top_game);
            let game = top_game.game;
            this.state.top_games[game._id] = top_game;
        });
        this.hasChanged();
    }

    getTopGames() {
        return _.chain(this.state.top_games)
                .values()
                .sortBy((top_game) => {
                    return top_game.viewers * -1;
                })
                .value();
    }
}

export default Marty.register(GameStore, "GameStore");
