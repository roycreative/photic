require.config({
  paths: {
    jquery: 'components/jquery/jquery',
    underscore: 'components/underscore/underscore',
    backbone: 'components/backbone/backbone'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['scripts/app'], function(app) {
  // use app here
});
