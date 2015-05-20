'use strict';

import Marty from 'marty';
import constants from '../constants/streamConstants';

class StreamStore extends Marty.Store {

    constructor(options) {
        super(options);

        this.state = {
            stream_game: {},
            streams: []
        };

        this.handlers = {
            load:  constants.LOAD_GAME_STREAMS
        };
    }

    load(game, streams) {
        this.state.stream_game = game;
        this.state.streams = streams;
        this.hasChanged();
    }

    getStreamGame() {
        return this.state.stream_game;
    }

    getStreams() {
        return this.state.streams;
    }
};

export default Marty.register(StreamStore, "StreamStore");
