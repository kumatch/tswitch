'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Viewers = require("./Viewers.jsx");

var globals  = require("../common/globals");
var template = require("./StreamInfo.template").locals(globals);

var StreamInfo = React.createClass({
    mixins: [ PureRenderMixin ],

    propTypes: {
        stream: React.PropTypes.object.isRequired
    },

    render: function () {
        var stream = this.props.stream;
        var owner = stream.channel.name;
        var viewers = stream.viewers;

        var values = {
            title: stream.channel.status,
            owner: owner,
            viewers: viewers,

            Viewers: Viewers
        };

        return template.call(this, values);
    }
});

module.exports = StreamInfo;
