global.$ = global.jQuery = require('jquery');

require('bootstrap');
require('admin-lte');

(function() {
  'use strict';

  // Enable Popover and Tooltip
  $('[data-toggle="popover"]').popover({html: true});
  $('[data-toggle="tooltip"]').tooltip();

  console.log('[Converge] Initialized');
})();
