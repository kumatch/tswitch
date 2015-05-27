'use strict';

import React from "react";
import { Locations, Location } from "react-router-component";

import Contents from "./Contents";

class App extends React.Component {
    render() {
        return (
            <Locations>
                <Location path="/" handler={Contents} />
                <Location path="/games/:game_name" handler={Contents} />
            </Locations>
        );
    }
}

export default App;
