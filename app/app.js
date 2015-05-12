var express = require('express');
var path = require('path');
var compression = require('compression');

var twitch = require("../lib/twitch");

var app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(express.static( path.join(__dirname, '../public') ));


// routes
app.get('/api/games/top', function (req, res, next) {
    twitch.fetchTopGames().then(function (top_games) {
        res.json({
            top_games: top_games
        });
    }, next);
});

app.get('/api/streams', function (req, res, next) {
    var game_name = req.query.game || undefined;
    if (!game_name) {
        next();
        return;
    }

    twitch.fetchGameStreams(game_name).then(function (streams) {
        res.json({
            streams: streams
        });
    }, next);
});



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    if (req.url.match(/^\/api\//)) {
        res.status(404).send(null);
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

/// error handlers

app.use(function(err, req, res, next) {
    var body = { };
    var status = err.status || 500;

    if (app.get('env') === 'development') {
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

module.exports = app;
