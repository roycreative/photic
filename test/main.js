require.config({
  baseUrl: "../app/scripts",
  paths: {
    backbone: 'components/backbone/backbone',
    handlebars: 'components/handlebars/handlebars-1.0.0-rc.1',
    jquery: 'components/jquery/jquery',
    text: 'components/requirejs-text/text',
    underscore: 'components/underscore/underscore',
    chai: "../../test/lib/chai",
    mocha: "../../test/lib/mocha/mocha",
    spec: "../../test/spec",
    runner: "../../test/runner/mocha"
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    mocha: {
      exports: 'mocha'
    },
    underscore: {
      exports: '_'
    }
  }
});

require(['runner', 'chai', 'mocha'], function(runner) {
  mocha.setup('bdd')
  runner()
});
