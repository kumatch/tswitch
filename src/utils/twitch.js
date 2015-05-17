"use strict";

import request from "axios";

const BASE_URL = "/api";

let twitch = {
    fetchGames: () => {
        let url = BASE_URL + "/games/top";

        return request.get(url).then((res) => {
            return res.data.top_games;
        });
    },

    fetchGameStreams: (name) => {
        let url = BASE_URL + "/streams";
        let params = {
            game: name
        };

        return request.get(url, {
            params: params
        }).then((res) => {
            return res.data.streams;
        });
    }
};

export default twitch;
