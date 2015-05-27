'use strict';

import Marty from "marty";
import constants from "../constants/clientConstants";

class ClientActionCreators extends Marty.ActionCreators {

    toggleSiteMenu() {
        this.dispatch(constants.CLIENT_TOGGLE_SITE_MENU);
    }

    toggleAutoPlay() {
        this.dispatch(constants.CLIENT_TOGGLE_AUTO_PLAY);
    }

    toggleMixSounds() {
        this.dispatch(constants.CLIENT_TOGGLE_MIX_SOUNDS);
    }

    selectGame(name) {
        this.dispatch(constants.CLIENT_SELECT_GAME, name);
    }

    selectStream(stream) {
        this.dispatch(constants.CLIENT_SELECT_STREAM, stream);
    }

    deselectStream(stream) {
        this.dispatch(constants.CLIENT_DESELECT_STREAM, stream);
    }
}

export default Marty.register(ClientActionCreators, "ClientActionCreators");
