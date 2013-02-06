require.config({
  paths: {
    backbone: 'scripts/components/backbone/backbone',
    handlebars: 'scripts/components/handlebars/handlebars-1.0.0-rc.2',
    jquery: 'scripts/components/jquery/jquery',
    photic: 'scripts',
    relational: 'scripts/components/backbone-relational/backbone-relational',
    text: 'scripts/components/requirejs-text/text',
    underscore: 'scripts/components/underscore/underscore',
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    relational: {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  }
});

require(['photic/app'], function(app) {
});
