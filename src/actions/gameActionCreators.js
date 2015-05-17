'use strict';

import Marty from "marty";
import twitch from "../utils/twitch";
import constants from "../constants/gameConstants";

class GameActionCreators extends Marty.ActionCreators {

    loadTopGames() {
        twitch.fetchGames().then((top_games) => {
            this.dispatch(constants.LOAD_TOP_GAMES, top_games);
        });
    }

    select(game) {
        this.dispatch(constants.SELECT_GAME, game);
    }
}

export default Marty.register(GameActionCreators, "GameActionCreators");
