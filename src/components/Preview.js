'use strict';

import React from 'react/addons';
import ReactMixin from "react-mixin";

class Preview extends React.Component {
    render() {
        return <img className="img-responsive" src={this.props.image} style={{ width: "100%" }} />;
    }
};

Preview.propTypes = {
    image: React.PropTypes.string.isRequired
};

ReactMixin(Preview.prototype, React.addons.PureRenderMixin);

export default Preview;
