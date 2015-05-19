'use strict';

import React from 'react';

import clientActionCreators from "../actions/clientActionCreators";

import globals from "../common/globals";
import template from "./StreamHeader.template";
let tmpl = template.locals(globals);

class StreamHeader extends React.Component {
    render() {
        let values = {
            client: this.props.client
        };

        return tmpl.call(this, values);
    }

    onToggleMenu() {
        clientActionCreators.for(this).toggleSiteMenu();
    }

    onToggleAutoPlay() {
        clientActionCreators.for(this).toggleAutoPlay();
    }
}

export default StreamHeader;
