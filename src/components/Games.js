'use strict';

import React from "react";
import Marty from "marty";

import Game from "./Game";

import gameActionCreators from "../actions/gameActionCreators";
import GameStore from "../stores/GameStore";

import globals from "../common/globals";
import template from "./Games.template";
let tmpl = template.locals(globals);

class Games extends React.Component {
    render() {
        let values = {
            top_games: this.props.top_games,
            selected_game: this.props.selected_game || {},

            Game: Game
        };

        return tmpl.call(this, values);
    }

    componentDidMount() {
        gameActionCreators.for(this).loadTopGames();
    }
}

export default Marty.createContainer(Games, {
    listenTo: [ GameStore ],

    fetch: {
        top_games() {
            return GameStore.for(this).getTopGames();
        },
        selected_game() {
            return GameStore.for(this).getSelectedGame();
        }
    },

    pending: function () {
        return <div className='loading'>Loading...</div>;
    },

    failed: function(errors) {
        return <div className='error'>Failed to load games. {errors}</div>;
    }
});
