import React from "react";
import Marty from "marty";

import Games from "./Games";
import Streams from "./Streams";

import clientActionCreators from "../actions/clientActionCreators";
import ClientStore from "../stores/ClientStore";

class Contents extends React.Component {
    render() {
        const client = this.props.client;

        return (<div id="wrapper" className={client.display_menu ? undefined : "toggled"}>
            <div id="sidebar-wrapper">
              <Games client={client} />
            </div>
            <div id="content-wrapper">
              <Streams client={client} />
            </div>
        </div>);
    }

    componentDidMount() {
        var name = decodeURIComponent(this.props.game_name).trim();

        if (this.props.game_name) {
            clientActionCreators.for(this).selectGame(name);
        }
    }

    componentDidUpdate(prevProps) {
        var name = decodeURIComponent(this.props.game_name).trim();
        var prevName = decodeURIComponent(prevProps.game_name).trim();

        if (name !== prevName) {
            clientActionCreators.for(this).selectGame(name);
        }
    }
}

export default Marty.createContainer(Contents, {
    listenTo: [ ClientStore ],

    fetch: {
        client() {
            return ClientStore.for(this).getClient();
        }
    },

    pending: function () {
        return <div className='loading'>Loading...</div>;
    },

    failed: function(errors) {
        return <div className='error'>Failed to load client. {errors}</div>;
    }
});
