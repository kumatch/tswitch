import React from 'react/addons';
import ReactMixin from "react-mixin";

import Viewers from "./Viewers";

class StreamInfo extends React.Component {
    render() {
        const stream = this.props.stream;
        const owner = stream.channel.name;
        const viewers = stream.viewers;
        const title = stream.channel.status;

        return (<div>
            <h4 className="title">{title}</h4>
            <p>
                <Viewers value={viewers} />
                <span>&nbsp;on&nbsp;</span>
                <span>{owner}</span>
            </p>
        </div>);
    }
}

StreamInfo.propTypes = {
    stream: React.PropTypes.object.isRequired
};

ReactMixin(StreamInfo.prototype, React.addons.PureRenderMixin);

export default StreamInfo;
