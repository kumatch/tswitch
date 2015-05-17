"use strict";

import client from "./client";
import cache  from "./cache";

const CACHE_LIFETIME = 60 * 1000;

let _cache = cache(CACHE_LIFETIME);

function _fetchTopGames () {
    let params = {
        limit: 100
    };

    return client.fetch("/games/top", params).then((res) =>{
        return res.data.top;
    });
}

export default {
    fetchTopGames:  () => {
        const cache_name = "__TOP_GAMES__";
        let top_games = _cache.get(cache_name);

        if (top_games && top_games.length) {
            return Promise.resolve(top_games);
        }

        return _fetchTopGames().then((top_games) => {
            _cache.set(cache_name, top_games);

            return top_games;
        });
    }
};

