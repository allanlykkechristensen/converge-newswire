var express = require('express');
var router = express.Router();

// TODO: Figure out a way to render app info in the layout without having it in every router
var appPackage = require('../package.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard', subtitle: 'Everything at your fingertips', heading: 'Welcome', content: 'Ready to go', version: appPackage.version });
});

module.exports = router;
