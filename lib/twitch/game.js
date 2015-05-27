"use strict";

import { uniq } from "lodash";
import client from "./client";
import cache  from "./cache";

const CACHE_LIFETIME = 30 * 1000;
const MIN_VIEWERS = 15;

let _cache = cache(CACHE_LIFETIME);

function _fetchTopGames (offset = 0) {
    let params = {
        limit: 100,
        offset: offset
    };

    return client.fetch("/games/top", params).then((res) =>{
        if (!res.data.top.length) {
            return [];
        }

        let results = [];
        let hasNext = true;

        res.data.top.forEach( t => {
            if (t.viewers >= MIN_VIEWERS) {
                results.push(t);
            } else {
                hasNext = false;
            }
        });

        if (!hasNext) {
            return results;
        } else {
            return _fetchTopGames( (offset + 100) ).then( top => {
                return results.concat(top);
            });
        }
    });
}


export default {
    fetchTopGames:  () => {
        const cache_name = "__TOP_GAMES__";
        let top_games = _cache.get(cache_name);

        if (top_games && top_games.length) {
            return Promise.resolve(top_games);
        }

        return _fetchTopGames().then((top_game) => {
            let top = uniq(top_game, (t) => {
                return t.game._id;
            });

            _cache.set(cache_name, top);

            return top;
        });
    }
};

