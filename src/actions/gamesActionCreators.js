'use strict';

var Marty = require('marty');
var twitch = require("../utils/twitch");

var constants = require('../constants/gamesConstants');

var gamesActionCreators = Marty.createActionCreators({
    id: "GamesActionCreators",

    loadTopGames: function () {
        self = this;

        twitch.fetchGames().then(function (top_games) {
            self.dispatch(constants.LOAD_TOP_GAMES, top_games);
        });
    },

    select: function (game) {
        this.dispatch(constants.SELECT_GAME, game);
    }
});

module.exports = gamesActionCreators;
