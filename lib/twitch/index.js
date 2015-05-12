var game = require("./game");
var stream = require("./stream");

exports.fetchTopGames = function () {
    return game.fetchTopGames();
};

exports.fetchGameStreams = function (name) {
    return stream.fetchByGameName(name);
};
