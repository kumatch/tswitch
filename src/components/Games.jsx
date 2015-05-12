'use strict';

var React = require('react');
var Marty = require('marty');

var Game = require("./Game.jsx");

var gamesActionCreators = require('../actions/gamesActionCreators');
var GamesStore = require('../stores/GamesStore');

var globals  = require("../common/globals");
var template = require("./Games.template").locals(globals);

var GamesState = Marty.createStateMixin({
    listenTo: [ GamesStore ],

    getState: function () {
        return {
            top_games: GamesStore.getTopGames(),
            selected_game: GamesStore.getSelectedGame()
        };
    }
});

var Games = React.createClass({
    mixins: [ GamesState ],

    render: function () {
        var values = {
            top_games: this.state.top_games,
            selected_game: this.state.selected_game || {},

            Game: Game
        };

        return template.call(this, values);
    },

    componentDidMount: function () {
        gamesActionCreators.loadTopGames();
    }
});

module.exports = Games;
