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

    selectGame(game) {
        this.dispatch(constants.CLIENT_SELECT_GAME, game);
    }
}

export default Marty.register(ClientActionCreators, "ClientActionCreators");
