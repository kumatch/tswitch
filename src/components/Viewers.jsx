'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var numeral = require("numeral");

var Viewers = React.createClass({
    mixins: [ PureRenderMixin ],

    propTypes: {
        value: React.PropTypes.number.isRequired
    },

    render: function () {
        return <span>{numeral(this.props.value).format("0,0")} viewers</span>;
    }
});

module.exports = Viewers;
