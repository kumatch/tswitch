"use strict";

import request from "axios";
import { format } from "util";

const BASE_URL = "/api";

let twitch = {
    fetchGames: (limit, offset) => {
        const url = format(BASE_URL + "/games/top?limit=%s&offset=%s", limit, offset);

        return request.get(url).then((res) => {
            return res.data.top_games;
        });
    },

    fetchGameStreams: (name) => {
        const url = BASE_URL + "/streams";
        const params = {
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
