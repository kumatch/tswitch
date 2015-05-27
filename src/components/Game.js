'use strict';

import React from 'react/addons';
import ReactMixin from "react-mixin";
import { Link } from "react-router-component";

import Viewers from "./Viewers";

import clientActionCreators from "../actions/clientActionCreators";
import streamActionCreators from "../actions/streamActionCreators";

import globals from "../common/globals";
import template from "./Game.template";
let tmpl = template.locals(globals);

class Game extends React.Component {
    render() {
        let client = this.props.client;
        let game = this.props.game;

        let values = {
            game: this.props.game,
            viewers: this.props.viewers,
            channels: this.props.channels,
            selected: client.isSelectedGame(game.name),

            Link: Link,
            Viewers: Viewers
        };

        return tmpl.call(this, values);
    }


    componentDidMount() {
        let client = this.props.client;
        let game = this.props.game;

        if (client.isSelectedGame(game.name)) {
            streamActionCreators.for(this).loadGameStreams(game);
        }
    }

    onSelect(e) {
        streamActionCreators.for(this).loadGameStreams(this.props.game);
    }
}

Game.propTypes = {
    client: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    viewers: React.PropTypes.number.isRequired,
    channels: React.PropTypes.number.isRequired
};

ReactMixin(Game.prototype, React.addons.PureRenderMixin);

export default Game;
