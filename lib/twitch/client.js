var request = require("axios");

var BASE_URL = "https://api.twitch.tv/kraken";
var VERSION = 3;

var headers = {
	"Accept": "application/vnd.twitchtv.v" + VERSION + "+json"
};

exports.fetch = function (resource, params) {
    var url = BASE_URL + resource;

    return request.get(url, {
        headers: headers,
        params: params
    });
};
