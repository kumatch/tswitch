'use strict';

import React from "react";
import Marty from "marty";

import Game from "./Game";

import gameActionCreators from "../actions/gameActionCreators";
import GameStore from "../stores/GameStore";

import globals from "../common/globals";
import template from "./Games.template";
const tmpl = template.locals(globals);


class Games extends React.Component {
    render() {
        let values = {
            client: this.props.client,
            top_games: this.props.top_games,
            Game: Game
        };

        return tmpl.call(this, values);
    }

    componentDidMount() {
        gameActionCreators.for(this).loadTopGames();

        setInterval( () => {
            gameActionCreators.for(this).loadTopGames();
        }, 20 * 1000);
    }
}

Games.propTypes = {
    client: React.PropTypes.object.isRequired
};


export default Marty.createContainer(Games, {
    listenTo: [ GameStore ],

    fetch: {
        top_games() {
            return GameStore.for(this).getTopGames();
        }
    },

    pending: function () {
        return <div className='loading'>Loading...</div>;
    },

    failed: function(errors) {
        return <div className='error'>Failed to load games. {errors}</div>;
    }
});
