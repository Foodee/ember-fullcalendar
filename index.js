/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-fullcalendar',

  // isDevelopingAddon: function() {
  //   return true;
  // },

  options: {
    nodeAssets: {
    }
  },

  included(app, parentAddon) {
    this._super.included.apply(this, arguments);

    var target = parentAddon || app;

    // allow addon to be nested - see: https://github.com/ember-cli/ember-cli/issues/3718
    if (target.app) {
      target = target.app;
    }

    this._super.included.apply(this, arguments);
  }
};
