import React from 'react';

import clientActionCreators from "../actions/clientActionCreators";

class StreamHeader extends React.Component {
    render() {
        const client = this.props.client;
        const menuIconName = client.display_menu ? "glyphicon-triangle-left" : "glyphicon-triangle-right";

        return (<div className="streams-header">
            <div className="pull-left streams-header-col">
                <a className="menu-switch" onClick={this.onToggleMenu.bind(this)}>
                    <span className={"glyphicon " + menuIconName}></span>
                </a>
            </div>
            <div className="pull-left streams-header-col">
                <div className="checkbox checkbox-inline checkbox-primary" onClick={this.onToggleAutoPlay.bind(this)}>
                    <input type="checkbox" checked={client.auto_play} readOnly />
                    <label>
                        <b>Auto play</b>
                    </label>
                </div>
            </div>
            <div className="pull-left streams-header-col">
                <div className="checkbox checkbox-inline checkbox-primary" onClick={this.onToggleMixSounds.bind(this)}>
                    <input type="checkbox" checked={client.mix_sounds} readOnly />
                    <label>
                        <b>Mix sounds</b>
                    </label>
                </div>
            </div>
        </div>);
    }

    onToggleMenu() {
        clientActionCreators.for(this).toggleSiteMenu();
    }

    onToggleAutoPlay() {
        clientActionCreators.for(this).toggleAutoPlay();
    }

    onToggleMixSounds() {
        clientActionCreators.for(this).toggleMixSounds();
    }
}

export default StreamHeader;
