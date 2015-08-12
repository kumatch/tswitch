"use strict";

import _ from "lodash";
import client from "./client";

const MIN_VIEWERS = 15;

function _fetchTopGamesFromTwitch (limit = 30, offset = 0) {
    let params = {
        limit: limit,
        offset: offset
    };

    return client.fetch("/games/top", params).then((res) =>{
        if (!res.data.top.length) {
            return [];
        }

        return _.reject(res.data.top, (t) => {
            return t.viewers < MIN_VIEWERS;
        });
    });
}


function _sort(top_games) {
    return Promise.resolve(_.sortBy(top_games, (t) => {
        return t.viewers * -1;
    }));
}

function _load(limit, offset) {
    return _fetchTopGamesFromTwitch(limit, offset).then((results) => {
        let top_games = {};

        results.forEach((result) => {
            const game = result.game;
            top_games[game._id] = result;
        });

        return _sort(top_games);
    });
}


export default {
    fetchTopGames(limit = 30, offset = 0) {
        return _fetchTopGamesFromTwitch(limit, offset).then((results) => {
            let top_games = {};

            results.forEach((result) => {
                const game = result.game;
                top_games[game._id] = result;
            });

            return _sort(top_games);
        });
    }
};

