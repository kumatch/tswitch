'use strict';

import Marty from "marty";
import constants from "../constants/clientConstants";

class ClientStore extends Marty.Store {
    constructor(options) {
        super(options);

        this.state = {
            display_menu: true,
            auto_play: false
        };
        this.handlers = {
            toggleSiteMenu: constants.CLIENT_TOGGLE_SITE_MENU,
            toggleAutoPlay: constants.CLIENT_TOGGLE_AUTO_PLAY
        };
    }

    toggleSiteMenu() {
        this.state.display_menu = !this.state.display_menu;
        this.hasChanged();
    }

    toggleAutoPlay() {
        this.state.auto_play = !this.state.auto_play;
        this.hasChanged();
    }

    getClient() {
        return this.state;
    }
}

export default Marty.register(ClientStore, "ClientStore");
