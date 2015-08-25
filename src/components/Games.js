import React from "react";
import Marty from "marty";

import Game from "./Game";

import gameActionCreators from "../actions/gameActionCreators";
import GameStore from "../stores/GameStore";

class Games extends React.Component {
    render() {
        const top_games = this.props.top_games;
        const client = this.props.client;

        let items = [];

        top_games.forEach((top_game, index) => {
            const game = top_game.game;
            const selected = client.isSelectedGame(game.name);
            const style = selected ? { backgroundColor: "#555" } : undefined;

            if (game && game.name) {
                items.push(<li key={"games-" + game._id} style={style}>
                  <Game client={client} game={game} viewers={top_game.viewers} channels={top_game.channels} />
                </li>);
            }
        });

        return (<ul className="sidebar-nav">
            {items}
        </ul>);
    }

    componentDidMount() {
        gameActionCreators.for(this).loadTopGames();

        setInterval( () => {
            gameActionCreators.for(this).loadTopGames();
        }, 60 * 1000);
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
