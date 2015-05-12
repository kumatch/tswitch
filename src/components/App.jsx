'use strict';

var React = require('react');
var Marty = require('marty');

var globals  = require("../common/globals");
var template = require("./App.template").locals(globals);

var Games = require("./Games.jsx");
var Streams = require("./Streams.jsx");

var App = React.createClass({
    getInitialState: function() {
        return {
            render_menu: true
        };
    },

    render: function () {
        return template.call(this, {
            menu: this.state.render_menu,
            Games: Games,
            Streams: Streams
        });
    },

    _toggleMenu: function () {
        this.setState({
            render_menu: !this.state.render_menu
        });
    }
});

module.exports = App;
