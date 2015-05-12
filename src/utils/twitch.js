var request = require("axios");

var BASE_URL = "/api";

exports.fetchGames = function () {
    var url = BASE_URL + "/games/top";

    return request.get(url).then(function (res) {
        return res.data.top_games;
    });
};

exports.fetchGameStreams = function (name) {
    var url = BASE_URL + "/streams";
    var params = {
        game: name
    };

    return request.get(url, {
        params: params
    }).then(function (res) {
        return res.data.streams;
    });
};
