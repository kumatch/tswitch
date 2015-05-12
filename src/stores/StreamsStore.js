'use strict';

var Marty = require('marty');

var constants = require('../constants/streamsConstants');

var StreamsStore = Marty.createStore({
    id: 'StreamsStore',

    handlers: {
        load:  constants.LOAD_GAME_STREAMS,
        select: constants.SELECT_STREAM
    },

    getInitialState: function () {
        return {
            game: null,
            streams: [],

            select_id: null
        };
    },

    load: function (game, streams) {
        this.state.game = game;
        this.state.streams = streams;
        this.hasChanged();
    },

    select: function (stream_id) {
        if (!stream_id) {
            this.state.select_id = null;
            this.hasChanged();
            return;
        }

        var select_id;

        this.state.streams.forEach(function (stream) {
            if (stream._id === stream_id) {
                select_id = stream_id;
            }
        });

        if (select_id && this.state.select_id !== select_id) {
            this.state.select_id = select_id;
            this.hasChanged();
        } else if (!select_id) {
            this.state.select_id = null;
            this.hasChanged();
        }
    },


    getGame: function () {
        return this.state.game;
    },

    getStreams: function () {
        return this.state.streams;
    },

    getSelectedStreamId: function () {
        return this.state.select_id;
    }
});

module.exports = StreamsStore;
