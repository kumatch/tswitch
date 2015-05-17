'use strict';

import React from 'react/addons';
import ReactMixin from "react-mixin";

import Viewers from "./Viewers";

import globals from "../common/globals";
import template from "./StreamInfo.template";
let tmpl = template.locals(globals);

class StreamInfo extends React.Component {
    render() {
        let stream = this.props.stream;
        let owner = stream.channel.name;
        let viewers = stream.viewers;

        let values = {
            title: stream.channel.status,
            owner: owner,
            viewers: viewers,

            Viewers: Viewers
        };

        return tmpl.call(this, values);
    }
}

StreamInfo.propTypes = {
    stream: React.PropTypes.object.isRequired
};

ReactMixin(StreamInfo.prototype, React.addons.PureRenderMixin);

export default StreamInfo;
