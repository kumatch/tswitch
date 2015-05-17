"use strict";

import express from "express";
import path from "path";
import compression from "compression";

import twitch from "../lib/twitch";

let app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(express.static( path.join(__dirname, '../public') ));


// routes
app.get('/api/games/top', (req, res, next) => {
    twitch.fetchTopGames().then((top_games) => {
        res.json({
            top_games: top_games
        });
    }, next);
});

app.get('/api/streams', (req, res, next) => {
    let game = req.query.game || undefined;
    if (!game) {
        next();
        return;
    }

    twitch.fetchGameStreams(game).then((streams) => {
        res.json({
            streams: streams
        });
    }, next);
});



/// catch 404 and forward to error handler
app.use((req, res, next) => {
    if (req.url.match(/^\/api\//)) {
        res.status(404).send(null);
    } else {
        let err = new Error('Not Found');

        err.status = 404;
        next(err);
    }
});

/// error handlers

app.use((err, req, res, next) => {
    let body = { };
    let status = err.status || 500;

    if (app.get('env') === 'development') {
        console.log(err.stack);
        body = {
            status: status,
            error: err,
            message: err.message
        };
    } else {
        body = {
            status: status,
            message: "Error."
        };
    }

    res.status(status).json(body);
});

export default app;
