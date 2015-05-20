'use strict';

import React from 'react/addons';
import { ScrollListenerMixin } from "react-scroll-components";

import Preview from "./Preview";
import Player from "./Player";
import StreamInfo from "./StreamInfo";

import clientActionCreators from '../actions/clientActionCreators';
import streamActionCreators from '../actions/streamActionCreators';

import globals from "../common/globals";
import template from "./Stream.template";
let tmpl = template.locals(globals);

const DELAY_STOP = 10 * 1000;

let Stream = React.createClass({
    mixins: [ React.addons.PureRenderMixin, ScrollListenerMixin ],

    propTypes: {
        client: React.PropTypes.object.isRequired,
        stream: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        var client = this.props.client;
        var stream = this.props.stream;

        return {
            selected: client.isSelectedStream(stream),
            inViewport: false,
            timer: null,

            // in component state.
            play: false,
            preview: false
        };
    },

    render: function () {
        var client = this.props.client;
        var stream = this.props.stream;
        var image  = stream.preview.medium;

        var values = {
            selected: this.state.selected,
            play: this.state.play,
            preview: this.state.preview,

            stream: stream,
            image: image,

            Preview: Preview,
            Player: Player,
            StreamInfo: StreamInfo
        };

        return tmpl.call(this, values);
    },

    componentDidMount: function () {
        this._updateViewport();
    },

    componentWillReceiveProps: function (nextProps) {
        var stream = this.props.stream;
        var client = this.props.client;
        var selected = client.isSelectedStream(stream);

        var player = this.refs.player;
        if (player) {
            if (selected) {
                player.unmute();
            } else {
                player.mute();
            }
        }

        this.setState({
            selected: selected
        });
    },

    onPageScrollEnd: function () {
        this._updateViewport();
    },

    onSelect: function (e) {
        if (this.state.selected) {
            return;
        }

        this.setState({
            play: true,
            preview: true
        });

        clientActionCreators.selectStream(this.props.stream);
        e.preventDefault();
        e.stopPropagation();
    },

    _isSelectedStream: function (props) {
        var stream = props.stream;
        var client = props.client;

        return client.isSelectedStream(stream);
    },

    _updateViewport: function () {
        var self = this;

        var auto_play = this.props.client.auto_play;
        var isPlay = this.state.play;
        var isPreview = this.state.preview;
        var inViewport = this._inViewport();


        if (this._isInbounded(inViewport)) {
            if (isPlay) {
                this.setState({
                    inViewport: true
                });
                return;
            }

            if (isPreview && auto_play) {
                this.setState({
                    inViewport: true,
                    play: true
                });
            } else if (auto_play) {
                this.setState({
                    inViewport: true,
                    play: true,
                    preview: true
                });
            } else {
                this.setState({
                    inViewport: true,
                    preview: true
                });
            }
        } else if (this._isOutbounded(inViewport)) {
            if (isPlay) {
                this._startPlayerStopTimer();
            }

            this.setState({
                inViewport: false
            });
        }
    },

    _startPlayerStopTimer: function () {
        var self = this;
        var stream = this.props.stream;

        setTimeout( () => {
            if (self._inViewport()) {
                return;
            }

            clientActionCreators.deselectStream(stream);

            self.setState({
                play: false,
                preview: true
            });
        }, DELAY_STOP);
    },


    _isInbounded: function (viewport) {
        return viewport && !this.state.inViewport;
    },

    _isOutbounded: function (viewport) {
        return !viewport && this.state.inViewport;
    },



    _inViewport: function () {
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
