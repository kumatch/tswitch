'use strict';

import React from 'react/addons';
import { ScrollListenerMixin } from "react-scroll-components";

import Preview from "./Preview";
import Player from "./Player";
import StreamInfo from "./StreamInfo";

import streamActionCreators from '../actions/streamActionCreators';

import globals from "../common/globals";
import template from "./Stream.template";
let tmpl = template.locals(globals);

const DELAY_STOP = 10 * 1000;

let Stream = React.createClass({
    mixins: [ React.addons.PureRenderMixin, ScrollListenerMixin ],

    propTypes: {
        client: React.PropTypes.object.isRequired,
        stream: React.PropTypes.object.isRequired,
        selected: React.PropTypes.bool.isRequired
    },

    getInitialState: function () {
        return {
            inViewport: false,
            timer: null
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

        return tmpl.call(this, values);
    },

    componentDidMount: function () {
        this._updateViewport();
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
        this._updateViewport();
    },

    onSelect: function (e) {
        if (this.props.selected) {
            return;
        } else {
            e.preventDefault();
            e.stopPropagation();

            this.setState({
                inViewport: true
            });

            streamActionCreators.for(this).selectStream(this.props.stream);
        }
    },


    _updateViewport: function () {
        var self = this;
        var selected = this.props.selected;

        var inViewport = this._inViewport();

        if (!inViewport && this.state.inViewport) {
            setTimeout( () => {
                if (self._inViewport()) {
                    return;
                }

                if (self.props.selected) {
                    streamActionCreators.for(self).unselectStream();
                }

                self.setState({
                    inViewport: false
                });
            }, DELAY_STOP);
        } else if (inViewport && !this.state.inViewport) {
            if (!this.props.client.auto_play) {
                return;
            }

            this.setState({
                inViewport: inViewport
            });
        }
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
