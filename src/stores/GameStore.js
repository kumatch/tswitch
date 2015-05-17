'use strict';

import Marty from "marty";
import constants from "../constants/gameConstants";

class GameStore extends Marty.Store {
    constructor(options) {
        super(options);

        this.state = {
            top_games: [],
            selected_game: null
        };
        this.handlers = {
            load:   constants.LOAD_TOP_GAMES,
            select: constants.SELECT_GAME
        };
    }

    load(top_games) {
        this.state.top_games = top_games;
        this.hasChanged();
    }

    select(game) {
        let selected_game;

        this.state.top_games.forEach((top_game) => {
            if (top_game.game._id === game._id) {
                selected_game = game;
            }
        });

        if (!this.state.selected_game && selected_game
            || this.state.selected_game && !selected_game) {
            this.state.selected_game = selected_game;
            this.hasChanged();
        }

        if (this.state.selected_game._id !== selected_game._id) {
            this.state.selected_game = selected_game;
            this.hasChanged();
        }
    }

    getTopGames() {
        return this.state.top_games;
    }

    getSelectedGame() {
        return this.state.selected_game;
    }
}

export default Marty.register(GameStore, "GameStore");
