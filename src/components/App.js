'use strict';

import React from "react";
import Marty from "marty";

import Games from "./Games";
import Streams from "./Streams";

import ClientStore from "../stores/ClientStore";

import globals from "../common/globals";
import template from "./App.template";
let tmpl = template.locals(globals);

class App extends React.Component {
    render() {
        return tmpl.call(this, {
            client: this.props.client,

            Games: Games,
            Streams: Streams
        });
    }
}

export default Marty.createContainer(App, {
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
