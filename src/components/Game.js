'use strict';

import React from 'react/addons';
import ReactMixin from "react-mixin";
import Viewers from "./Viewers";

import clientActionCreators from "../actions/clientActionCreators";
import streamActionCreators from "../actions/streamActionCreators";

import globals from "../common/globals";
import template from "./Game.template";
let tmpl = template.locals(globals);

class Game extends React.Component {
    render() {
        let values = {
            game: this.props.game,
            viewers: this.props.viewers,
            channels: this.props.channels,
            selected: this.props.selected ? true : false,

            Viewers: Viewers
        };

        return tmpl.call(this, values);
    }

    onSelect(e) {
        clientActionCreators.for(this).selectGame(this.props.game);
        streamActionCreators.for(this).loadGameStreams(this.props.game);

        e.preventDefault();
        e.stopPropagation();
    }
}

Game.propTypes = {
    game: React.PropTypes.object.isRequired,
    viewers: React.PropTypes.number.isRequired,
    channels: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool
};

ReactMixin(Game.prototype, React.addons.PureRenderMixin);

export default Game;
