'use strict';

import Marty from "marty";
import twitch from "../utils/twitch";
import constants from "../constants/gameConstants";

class GameActionCreators extends Marty.ActionCreators {

    loadTopGames(offset = 0) {
        const limit = 30;

        twitch.fetchGames(limit, offset).then((top_games) => {
            this.dispatch(constants.LOAD_TOP_GAMES, top_games);

            if (top_games.length >= limit - 5) {
                offset += 25;

                setTimeout(() => {
                    this.loadTopGames(offset);
                }, 200);
            }
        });
    }

    select(game) {
        this.dispatch(constants.SELECT_GAME, game);
    }
}

export default Marty.register(GameActionCreators, "GameActionCreators");
