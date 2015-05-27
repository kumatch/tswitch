'use strict';

import React from "react";
import Marty from "marty";

import Games from "./Games";
import Streams from "./Streams";

import clientActionCreators from "../actions/clientActionCreators";
import ClientStore from "../stores/ClientStore";

import globals from "../common/globals";
import template from "./Contents.template";
let tmpl = template.locals(globals);

class Contents extends React.Component {
    render() {
        return tmpl.call(this, {
            client: this.props.client,
            Games: Games, Streams: Streams
        });
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
