var browserify = require('browserify-middleware');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Require available roots
var routes = require('./routes/index');

var app = express();

// View Engine Setup (Handlebars)
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
app.set('view engine', 'hbs');

browserify.settings({
  transform: ['hbsfy']
});


// Configuration of Browser Sync for the development environment
if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var config = {
    files: ["app.js", "public/**/*.{js,css}", "views/**/*.hbs", "routes/**/*.js"],
    logLevel: 'debug',
    logSnippet: false,
    reloadDelay: 3000,
    reloadOnRestart: true
  };
  var bs = browserSync(config);
  app.use(require('connect-browser-sync')(bs));
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: It's ugly to have all these routes in the main app - figure out a way to separate, but remember that order is important

// Bootstrap Paths
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));

// Font pack: Font Awesome
app.use('/css', express.static(path.join(__dirname, '/node_modules/font-awesome/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/font-awesome/fonts')));

// Font pack: Ionicons
app.use('/css', express.static(path.join(__dirname, '/node_modules/ionicons/dist/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/ionicons/dist/fonts')));

// Admin LTE Paths
app.use('/css', express.static(path.join(__dirname, '/node_modules/admin-lte/dist/css')));
app.use('/img', express.static(path.join(__dirname, '/node_modules/admin-lte/dist/img')));

// Bundling of JavaScripts
app.get('/javascripts/bundle.js', browserify(__dirname + '/client/app.js'));

// Routes - Index
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
