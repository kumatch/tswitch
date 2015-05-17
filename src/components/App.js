'use strict';

import React from "react";

import Games from "./Games";
import Streams from "./Streams";

import globals from "../common/globals";
import template from "./App.template";
let tmpl = template.locals(globals);

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            render_menu: true
        };
    }

    render() {
        return tmpl.call(this, {
            menu: this.state.render_menu,
            Games: Games,
            Streams: Streams
        });
    }

    onToggleMenu() {
        this.setState({
            render_menu: !this.state.render_menu
        });
    }
};
