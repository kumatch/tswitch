import React from "react";
import Marty from "marty";
import { Grid, Row } from "react-bootstrap";

import Header from "./StreamHeader";
import Stream from "./Stream";

import StreamStore from "../stores/StreamStore";

class Streams extends React.Component {
    render() {
        let client = this.props.client;
        let streams = [];

        if (client.isSelectedGame(this.props.stream_game.name)) {
            streams = this.props.streams;
        }

        let headerDOM, nameDOM, streamsDOM;
        if (streams.length) {
            headerDOM = <Header client={client} />;
        }

        if (client.select_game) {
            nameDOM = <h2 style={{ fontWeight: "normal", fontSize: "30px" }}>{client.select_game}</h2>;
        }

        const items = streams.map((stream) => {
            return <Stream key={"streams-" + stream._id} client={client} stream={stream} endScrollTimeout={300} />;
        });

        if (items.length) {
            streamsDOM = <Row>{items}</Row>;
        }


        return (<div>
            {headerDOM}
            <Grid fluid style={{ padding: "40px 20px" }}>
                {nameDOM}
                {streamsDOM}
            </Grid>
        </div>);
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
