'use strict';

import React from "react";
import Marty from "marty";

import Header from "./StreamHeader";
import Stream from "./Stream";

import StreamStore from "../stores/StreamStore";

import globals from "../common/globals";
import template from "./Streams.template";
let tmpl = template.locals(globals);

class Streams extends React.Component {
    render() {
        let client = this.props.client;
        let streams = [];

        if (client.isSelectedGame(this.props.stream_game.name)) {
            streams = this.props.streams;
        }

        let values = {
            client: client,
            game_name: client.select_game,
            streams: streams,

            Header: Header,
            Stream: Stream
        };

        return tmpl.call(this, values);
    }
}

Streams.propTypes = {
    client: React.PropTypes.object.isRequired
};

export default Marty.createContainer(Streams, {
    listenTo: [ StreamStore ],

    fetch: {
        stream_game() {
            return StreamStore.for(this).getStreamGame();
        },

        streams() {
            return StreamStore.for(this).getStreams();
        }
    },

    pending: function () {
        return <div className='loading'>Loading...</div>;
    },

    failed: function(errors) {
        return <div className='error'>Failed to load streams. {errors}</div>;
    }
});
