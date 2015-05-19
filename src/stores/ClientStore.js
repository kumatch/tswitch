'use strict';

import Marty from "marty";
import constants from "../constants/clientConstants";
import storage from "../utils/storage";

class ClientStore extends Marty.Store {
    constructor(options) {
        super(options);

        let auto_play = parseInt(storage.get("auto_play"), 10);
        if (typeof auto_play === "undefined") {
            auto_play = 1;
        }

        this.state = {
            display_menu: true,
            auto_play: auto_play ? true : false,

            select_game: {}
        };

        this.handlers = {
            toggleSiteMenu: constants.CLIENT_TOGGLE_SITE_MENU,
            toggleAutoPlay: constants.CLIENT_TOGGLE_AUTO_PLAY,
            selectGame: constants.CLIENT_SELECT_GAME
        };
    }

    toggleSiteMenu() {
        this.state.display_menu = !this.state.display_menu;
        this.hasChanged();
    }

    toggleAutoPlay() {
        this.state.auto_play = !this.state.auto_play;

        storage.set("auto_play", this.state.auto_play ? 1 : 0);

        this.hasChanged();
    }

    selectGame(game) {
        this.state.select_game = game;
        this.hasChanged();
    }

    getClient() {
        return this.state;
    }
}

export default Marty.register(ClientStore, "ClientStore");
