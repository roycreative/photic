require.config({
  paths: {
    backbone: 'components/backbone/backbone',
    handlebars: 'components/handlebars/handlebars-1.0.0-rc.1',
    jquery: 'components/jquery/jquery',
    text: 'components/requirejs-text/text',
    underscore: 'components/underscore/underscore'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    underscore: {
      exports: '_'
    }
  }
});

require(['app'], function(app) {
  // use app here
});