'use strict';

import _ from "lodash";
import Marty from "marty";
import constants from "../constants/clientConstants";
import storage from "../utils/storage";

class Client {
    constructor(params) {
        this.display_menu = true;
        this.auto_play = params.auto_play ? true : false;
        this.mix_sounds = params.mix_sounds ? true : false;

        this.select_game = null;
        this.select_streams = [];
    }

    switchDisplayMenu() {
        this.display_menu = !this.display_menu;
    }

    switchAutoPlay() {
        this.auto_play = !this.auto_play;
    }

    switchMixSounds() {
        this.mix_sounds = !this.mix_sounds;
    }

    isSelectedGame(name) {
        if (!this.select_game) {
            return false;
        }

        return this.select_game === name;
    }

    isSelectedStream(stream) {
        return _.findWhere(this.select_streams, { _id: stream._id }) ? true : false;
    }

    selectGame(name) {
        this.select_game = name;
    }

    selectStream(stream) {
        if (!this.mix_sounds) {
            this.select_streams = [ stream ];
        } else {
            if (!this.isSelectedStream(stream)) {
                this.select_streams.push(stream);
            }
        }
    }

    deselectStream(stream) {
        this.select_streams = _.reject(this.select_streams, { _id: stream._id });
    }
}

class ClientStore extends Marty.Store {
    constructor(options) {
        super(options);

        let auto_play = storage.get("auto_play");
        if (typeof auto_play !== "undefined") {
            auto_play = parseInt(auto_play) || 0;
        } else {
            auto_play = 1;
        }


        let mix_sounds = parseInt(storage.get("mix_sounds")) || 0;

        this.state = {
            client: new Client({
                auto_play: auto_play,
                mix_sounds: mix_sounds
            })
        };

        this.handlers = {
            toggleSiteMenu:  constants.CLIENT_TOGGLE_SITE_MENU,
            toggleAutoPlay:  constants.CLIENT_TOGGLE_AUTO_PLAY,
            toggleMixSounds: constants.CLIENT_TOGGLE_MIX_SOUNDS,
            selectGame:      constants.CLIENT_SELECT_GAME,
            selectStream:    constants.CLIENT_SELECT_STREAM,
            deselectStream:  constants.CLIENT_DESELECT_STREAM
        };
    }

    toggleSiteMenu() {
        this.state.client.switchDisplayMenu();
        this.hasChanged();
    }

    toggleAutoPlay() {
        this.state.client.switchAutoPlay();

        storage.set("auto_play", this.state.client.auto_play ? 1 : 0);

        this.hasChanged();
    }

    toggleMixSounds() {
        this.state.client.switchMixSounds();

        storage.set("mix_sounds", this.state.client.mix_sounds ? 1 : 0);

        this.hasChanged();
    }

    selectGame(name) {
        this.state.client.selectGame(name);
        this.hasChanged();
    }

    selectStream(stream) {
        this.state.client.selectStream(stream);
        this.hasChanged();
    }

    deselectStream(stream) {
        this.state.client.deselectStream(stream);
        this.hasChanged();
    }

    getClient() {
        return this.state.client;
    }
}

export default Marty.register(ClientStore, "ClientStore");
