var Promise = require("bluebird");
var client = require("./client");
var cache = require("./cache");

var CACHE_LIFETIME = 60 * 1000;

var _cache = cache(CACHE_LIFETIME);

function fetchTopGames () {
    var params = {
        limit: 100
    };

    return client.fetch("/games/top", params).then(function (res) {
        return res.data.top;
    });
}

exports.fetchTopGames = function () {
    var cache_name = "__TOP_GAMES__";
    var top_games = _cache.get(cache_name);

    if (top_games && top_games.length) {
        return Promise.resolve(top_games);
    }

    return fetchTopGames().then(function (top_games) {
        _cache.set(cache_name, top_games);

        return top_games;
    });
};

