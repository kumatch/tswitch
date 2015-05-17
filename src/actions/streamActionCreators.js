'use strict';

import Marty from "marty";
import twitch from "../utils/twitch";
import constants from "../constants/streamConstants";

class StreamActionCreators extends Marty.ActionCreators {

    loadGameStreams(game) {
        twitch.fetchGameStreams(game.name).then(streams => {
            this.dispatch(constants.LOAD_GAME_STREAMS, game, streams);
        });
    }

    selectStream(stream) {
        let id;

        if (stream) {
            id = stream._id;
        }

        this.dispatch(constants.SELECT_STREAM, id);
    }

    unselectStream() {
        this.dispatch(constants.SELECT_STREAM, null);
    }
}

export default Marty.register(StreamActionCreators, "StreamActionCreators");
