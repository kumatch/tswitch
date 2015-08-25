import React from 'react/addons';
import ReactMixin from "react-mixin";
import { Link } from "react-router-component";

import Viewers from "./Viewers";

import clientActionCreators from "../actions/clientActionCreators";
import streamActionCreators from "../actions/streamActionCreators";

class Game extends React.Component {
    render() {
        const game = this.props.game;
        const viewers = this.props.viewers;

        const href = "/games/" + game.name;

        return (<Link className="game-menu" href={href} onClick={this.onSelect.bind(this)}>
          <img className="game-image" src={game.box.small} />
          <div className="game-info">
            <div className="title">{game.name}</div>
            <div className="viewers">
              <Viewers value={viewers} />
            </div>
          </div>
        </Link>);
    }

    componentDidMount() {
        let client = this.props.client;
        let game = this.props.game;

        if (client.isSelectedGame(game.name)) {
            streamActionCreators.for(this).loadGameStreams(game);
        }
    }

    onSelect() {
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
