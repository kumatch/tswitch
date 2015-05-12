'use strict';

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Preview = React.createClass({
    mixins: [ PureRenderMixin ],

    propTypes: {
        image: React.PropTypes.string.isRequired
    },

    render: function () {
        return <img className="img-responsive" src={this.props.image} style={{ width: "100%" }} />;
    }
});

module.exports = Preview;
