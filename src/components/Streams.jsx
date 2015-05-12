'use strict';

var React = require('react');
var Marty = require('marty');

var Stream = require("./Stream.jsx");

var streamsActionCreators = require('../actions/streamsActionCreators');
var StreamsStore = require('../stores/StreamsStore');

var globals  = require("../common/globals");
var template = require("./Streams.template").locals(globals);

var StreamsState = Marty.createStateMixin({
    listenTo: [ StreamsStore ],

    getState: function () {
        return {
            game: StreamsStore.getGame(),
            streams: StreamsStore.getStreams(),
            select_id: StreamsStore.getSelectedStreamId()
        };
    }
});

var Streams = React.createClass({
    mixins: [ StreamsState ],

    render: function () {
        if (!this.state.game || !this.state.streams.length) {
            return <span />;
        }

        var values = {
            game: this.state.game,
            streams: this.state.streams,
            select_id: this.state.select_id,

            Stream: Stream
        };

        return template.call(this, values);
    }
});

module.exports = Streams;
