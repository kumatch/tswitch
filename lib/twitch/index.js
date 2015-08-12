"use strict";

import game from "./game";
import stream from "./stream";

export default {
    fetchTopGames: (limit, offset) => {
        return game.fetchTopGames(limit, offset);
    },

    fetchGameStreams: (game) => {
        return stream.fetchByGame(game);
    }
};

