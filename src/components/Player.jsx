'use strict';

var React = require('react');
var Marty = require('marty');
var format = require("util").format;

var globals  = require("../common/globals");
var template = require("./Player.template").locals(globals);

var Player = React.createClass({

    propTypes: {
        stream: React.PropTypes.object.isRequired
    },

    render: function () {
        var stream = this.props.stream;

        var values = {
            stream_id: this.__createStreamId(stream)
        };

        return template.call(this, values);
    },


    componentDidMount: function () {
        var stream = this.props.stream;
        var channel = stream.channel;
        var stream_id = this.__createStreamId(stream);

        var flashvars = {
            embed: 0,
            channel: channel.name,
            auto_play: "false",
            wmode: "transparent"
        };

        var params = {
            allowScriptAccess:"always",
            allowFullScreen:"false",
            wmode: "transparent",
            scale: "exactFit"
        };

        var attributes = {
        };

        swfobject.embedSWF("//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf", stream_id,
                           "100%", "100%", "11", null,
                           flashvars, params, attributes, function (load) {
                               if (!load.success) {
                                   return;
                               }

                               var player = load.ref;

                               function mute (player) {
                                   if (typeof player.mute === "function") {
                                       player.mute();
                                   } else {
                                       setTimeout(function () {
                                           mute(player);
                                       }, 200);
                                   }
                               }

                               function start (player) {
                                   if (typeof player.playVideo === "function") {
                                       player.playVideo();
                                   } else {
                                       setTimeout(function () {
                                           start(player);
                                       }, 200);
                                   }
                               }

                               setTimeout(function () {
                                   mute(player);
                                   start(player);
                               }, 200);
                           });
    },


    mute: function () {
        var player = this.__getPlayer();
        if (player) {
            player.mute();
        }
    },

    unmute: function () {
        var player = this.__getPlayer();
        if (player) {
            player.unmute();
        }
    },

    __getPlayer: function () {
        return swfobject.getObjectById(this.__createStreamId(this.props.stream));
    },

    __createStreamId: function (stream) {
        var channel = stream.channel;
        return format("twitch-streams-%s", channel.name);
    }
});

module.exports = Player;
