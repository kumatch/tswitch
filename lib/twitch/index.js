"use strict";

import game from "./game";
import stream from "./stream";

export default {
    fetchTopGames: () => {
        return game.fetchTopGames();
    },

    fetchGameStreams: (game) => {
        return stream.fetchByGame(game);
    }
};

