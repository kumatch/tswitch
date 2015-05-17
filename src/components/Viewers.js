"use strict";

import React from 'react';
import ReactMixin from "react-mixin";
import numeral from "numeral";
import { addons } from "react/addons";

class Viewers extends React.Component {
    render() {
        return <span>{numeral(this.props.value).format("0,0")} viewers</span>;
    }
};

Viewers.propTypes = {
    value: React.PropTypes.number.isRequired
};

ReactMixin(Viewers.prototype, addons.PureRenderMixin);

export default Viewers;
