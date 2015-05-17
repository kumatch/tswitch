'use strict';

import Marty from 'marty';
import constants from '../constants/streamConstants';

class StreamStore extends Marty.Store {

    constructor(options) {
        super(options);

        this.state = {
            game: null,
            streams: [],

            select_id: null
        };

        this.handlers = {
            load:  constants.LOAD_GAME_STREAMS,
            select: constants.SELECT_STREAM
        };
    }

    load(game, streams) {
        this.state.game = game;
        this.state.streams = streams;
        this.hasChanged();
    }

    select(stream_id) {
        if (!stream_id) {
            this.state.select_id = null;
            this.hasChanged();
            return;
        }

        let select_id;

        this.state.streams.forEach((stream) => {
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
    }



    getGame() {
        return this.state.game;
    }

    getStreams() {
        return this.state.streams;
    }

    getSelectedStreamId() {
        return this.state.select_id;
    }
};

export default Marty.register(StreamStore, "StreamStore");
