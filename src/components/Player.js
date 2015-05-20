'use strict';

import React from 'react';
import { format } from "util";

import globals from "../common/globals";
import template from "./Player.template";
let tmpl = template.locals(globals);

class Player extends React.Component {

    render() {
        let stream = this.props.stream;
        let values = {
            stream_id: this.__createStreamId(stream)
        };

        return tmpl.call(this, values);
    }

    componentDidMount() {
        let stream = this.props.stream;
        let channel = stream.channel;
        let stream_id = this.__createStreamId(stream);
        let sound = this.props.sound;

        let flashvars = {
            embed: 0,
            channel: channel.name,
            auto_play: "false",
            wmode: "transparent"
        };

        let params = {
            allowScriptAccess:"always",
            allowFullScreen:"false",
            wmode: "transparent",
            scale: "exactFit"
        };

        let attributes = { };

        swfobject.embedSWF("//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf", stream_id,
                           "100%", "100%", "11", null,

                           flashvars, params, attributes, (load) => {
                               if (!load.success) {
                                   return;
                               }

                               let player = load.ref;

                               function mute (player) {
                                   if (typeof player.mute === "function") {
                                       if (sound) {
                                           player.unmute();
                                       } else {
                                           player.mute();
                                       }
                                   } else {
                                       setTimeout(() => {
                                           mute(player);
                                       }, 200);
                                   }
                               }

                               function start (player) {
                                   if (typeof player.playVideo === "function") {
                                       player.playVideo();
                                   } else {
                                       setTimeout(() => {
                                           start(player);
                                       }, 200);
                                   }
                               }

                               setTimeout(() => {
                                   mute(player);
                                   start(player);
                               }, 200);
                           });
    }

    mute() {
        let player = this.__getPlayer();
        if (player) {
            player.mute();
        }
    }

    unmute() {
        let player = this.__getPlayer();
        if (player) {
            player.unmute();
        }
    }

    __getPlayer() {
        return swfobject.getObjectById(this.__createStreamId(this.props.stream));
    }

    __createStreamId(stream) {
        let channel = stream.channel;

        return format("twitch-streams-%s", channel.name);
    }
}

Player.propTypes = {
    stream: React.PropTypes.object.isRequired
};

export default Player;
