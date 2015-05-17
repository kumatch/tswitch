"use strict";

import client from "./client";
import cache  from "./cache";

const CACHE_LIFETIME = 60 * 1000;
const FETCH_LIMIT = 100;

let _cache = cache(CACHE_LIFETIME);

function _fetchStreams (game_name) {
    var params = {
        game: game_name,
        limit: FETCH_LIMIT
    };

    return client.fetch("/streams", params).then(function (res) {
        return res.data.streams;
    });
}

export default {
    fetchByGame: (game) => {
        let streams = _cache.get(game);

        if (streams && streams.length) {
            return Promise.resolve(streams);
        }

        return _fetchStreams(game).then((streams) => {
            _cache.set(game, streams);

            return streams;
        });
    }
};
