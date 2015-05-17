"use strict";

import * as request from "axios";

const BASE_URL = "https://api.twitch.tv/kraken";
const VERSION = 3;

let headers = {
	"Accept": "application/vnd.twitchtv.v" + VERSION + "+json"
};

let client = {
    fetch:  (resource, params) => {
        let url = BASE_URL + resource;

        return request.get(url, {
            headers: headers,
            params: params
        });
    }
};

export default client;
