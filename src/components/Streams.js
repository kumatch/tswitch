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
        if (!this.props.game || !this.props.streams.length) {
            return <span />;
        }

        let values = {
            client: this.props.client,
            game: this.props.game,
            streams: this.props.streams,
            select_id: this.props.select_id,

            Header: Header,
            Stream: Stream
        };

        return tmpl.call(this, values);
    }
}


export default Marty.createContainer(Streams, {
    listenTo: [ StreamStore ],

    fetch: {
        game() {
            return StreamStore.for(this).getGame();
        },

        streams() {
            return StreamStore.for(this).getStreams();
        },

        select_id() {
            return StreamStore.for(this).getSelectedStreamId();
        }
    },

    pending: function () {
        return <div className='loading'>Loading...</div>;
    },

    failed: function(errors) {
        return <div className='error'>Failed to load streams. {errors}</div>;
    }
});
