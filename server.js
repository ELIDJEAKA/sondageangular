//Install express server
var fallback = require('express-history-api-fallback');
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/sondage/index.html'));

var root = __dirname + '/dist/sondage';
app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
