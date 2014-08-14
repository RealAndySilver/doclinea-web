var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib());
};

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));

app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.sendfile('public/www/index.html');
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
