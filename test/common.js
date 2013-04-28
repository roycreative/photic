require.config({
  paths: {
    // app paths
    backbone: 'scripts/components/backbone/backbone',
    handlebars: 'scripts/components/handlebars/handlebars',
    jquery: 'scripts/components/jquery/jquery',
    relational: 'scripts/components/backbone-relational/backbone-relational',
    photic: 'scripts',
    text: 'scripts/components/requirejs-text/text',
    underscore: 'scripts/components/underscore/underscore',
    // testing framework paths
    chai: 'scripts/components/chai/chai',
    mocha: 'scripts/components/mocha/mocha',
    resources: 'sample_resources',
    sinon: 'scripts/components/sinon/pkg/sinon',
    spec: 'spec'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    jquery: {
      exports: '$'
    },
    mocha: {
      init: function() {
        // Mocha (rightly so) detects Backbone.history as a global leak
        // Had to ignoreLeaks to pass tests
        this.mocha.setup({ui: 'bdd', ignoreLeaks: true});
        return this.mocha;
      }
    },
    relational: {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    sinon: {
      exports: 'sinon'
    },
    underscore: {
      exports: '_'
    }
  }
});
