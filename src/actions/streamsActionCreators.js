'use strict';

var Marty = require('marty');
var twitch = require("../utils/twitch");

var constants = require('../constants/streamsConstants');

var streamsActionCreators = Marty.createActionCreators({
    id: "StreamsActionCreators",

    selectGame: function (game) {
        self = this;

        twitch.fetchGameStreams(game.name).then(function (streams) {
            self.dispatch(constants.LOAD_GAME_STREAMS, game, streams);
        });
    },

    selectStream: function (stream) {
        var id;

        if (stream) {
            id = stream._id;
        }

        this.dispatch(constants.SELECT_STREAM, id);
    },

    unselectStream: function () {
        this.dispatch(constants.SELECT_STREAM, null);
    }
});

module.exports = streamsActionCreators;
