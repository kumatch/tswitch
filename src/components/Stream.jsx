'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var scrollComponents = require('react-scroll-components');
var ScrollListenerMixin = scrollComponents.ScrollListenerMixin;

var Preview = require("./Preview.jsx");
var Player = require("./Player.jsx");
var StreamInfo = require("./StreamInfo.jsx");

var streamsActionCreators = require('../actions/streamsActionCreators');

var globals  = require("../common/globals");
var template = require("./Stream.template").locals(globals);

var Stream = React.createClass({
    mixins: [ PureRenderMixin, ScrollListenerMixin ],

    propTypes: {
        stream: React.PropTypes.object.isRequired,
        selected: React.PropTypes.bool.isRequired
    },

    getInitialState: function () {
        return {
            inViewport: false
        };
    },

    render: function () {
        var stream = this.props.stream;
        var image  = stream.preview.medium;

        var values = {
            selected: this.props.selected,
            inViewport: this.state.inViewport,
            stream: stream,
            image: image,

            Preview: Preview,
            Player: Player,
            StreamInfo: StreamInfo
        };

        return template.call(this, values);
    },

    componentDidMount: function () {
        var self = this;

        setTimeout(this.__updateViewport, 500);
    },

    componentWillReceiveProps: function (nextProps) {
        var player = this.refs.player;
        if (!player) {
            return;
        }

        if (nextProps.selected) {
            player.unmute();
        } else {
            player.mute();
        }
    },

    onPageScrollEnd: function () {
        this.__updateViewport();
    },

    _select: function (e) {
        if (this.props.selected) {
            return;
        } else {
            e.preventDefault();
            e.stopPropagation();

            streamsActionCreators.selectStream(this.props.stream);
        }
    },


    __updateViewport: function () {
        var inViewport = this.__inViewport();
        if (this.props.selected && !inViewport) {
            streamsActionCreators.unselectStream();
        }

        if (inViewport !== this.state.inViewport) {
            this.setState({
                inViewport: inViewport
            });
        }
    },

    __inViewport: function () {
        var dom = this.getDOMNode();

        var rect = dom.getBoundingClientRect();
        var vpHeight = window.innerHeight || document.documentElement.clientHeight;
        var vpWidth = window.innerWidth || document.documentElement.clientWidth;

        var forward_lag = 10;

        return (rect.bottom >= 0
                && rect.right >= 0
                && (rect.top  - forward_lag) <= vpHeight
                && (rect.left - forward_lag) <= vpWidth
               );
    }
});


module.exports = Stream;
