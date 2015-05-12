'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Viewers = require("./Viewers.jsx");

var gamesActionCreators = require('../actions/gamesActionCreators');
var streamsActionCreators = require('../actions/streamsActionCreators');

var globals  = require("../common/globals");
var template = require("./Game.template").locals(globals);

var Game = React.createClass({
    mixins: [ PureRenderMixin ],

    propTypes: {
        game: React.PropTypes.object.isRequired,
        viewers: React.PropTypes.number.isRequired,
        channels: React.PropTypes.number.isRequired,
        selected: React.PropTypes.bool
    },

    render: function () {
        return template.call(this, {
            game: this.props.game,
            viewers: this.props.viewers,
            channels: this.props.channels,
            selected: this.props.selected ? true : false,

            Viewers: Viewers
        });
    },

    _select: function (e) {
        gamesActionCreators.select(this.props.game);
        streamsActionCreators.selectGame(this.props.game);

        e.preventDefault();
        e.stopPropagation();
    }
});

module.exports = Game;
