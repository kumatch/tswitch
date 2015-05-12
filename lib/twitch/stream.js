var Promise = require("bluebird");
var client = require("./client");
var cache = require("./cache");

var CACHE_LIFETIME = 60 * 1000;
var FETCH_LIMIT = 100;

var _cache = cache(CACHE_LIFETIME);


function fetchStreams (game_name) {
    var params = {
        game: game_name,
        limit: FETCH_LIMIT
    };

    return client.fetch("/streams", params).then(function (res) {
        return res.data.streams;
    });
}


exports.fetchByGameName = function (game_name) {
    var streams = _cache.get(game_name);

    if (streams && streams.length) {
        return Promise.resolve(streams);
    }

    return fetchStreams(game_name).then(function (streams) {
        _cache.set(game_name, streams);

        return streams;
    });
};

