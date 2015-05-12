'use strict';

var Marty = require('marty');

var constants = require('../constants/gamesConstants');

var GamesStore = Marty.createStore({
    id: 'GamesStore',

    handlers: {
        load:   constants.LOAD_TOP_GAMES,
        select: constants.SELECT_GAME
    },

    getInitialState: function () {
        return {
            top_games: [],
            selected_game: null
        };
    },

    load: function (top_games) {
        this.state.top_games = top_games;
        this.hasChanged();
    },

    select: function (game) {
        var selected_game;

        this.state.top_games.forEach(function (top_game) {
            if (top_game.game._id === game._id) {
                selected_game = game;
            }
        });

        if (!this.state.selected_game && selected_game
            || this.state.selected_game && !selected_game) {
            this.state.selected_game = selected_game;
            this.hasChanged();
        }

        if (this.state.selected_game._id !== selected_game._id) {
            this.state.selected_game = selected_game;
            this.hasChanged();
        }
    },

    getTopGames: function () {
        return this.state.top_games;
    },

    getSelectedGame: function () {
        return this.state.selected_game;
    }
});

module.exports = GamesStore;
