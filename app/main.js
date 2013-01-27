require.config({
  paths: {
    // required for photic
    backbone: 'scripts/components/backbone/backbone',
    handlebars: 'scripts/components/handlebars/handlebars-1.0.0-rc.1',
    jquery: 'scripts/components/jquery/jquery',
    relational: 'scripts/components/backbone-relational/backbone-relational',
    scripts: 'scripts',
    text: 'scripts/components/requirejs-text/text',
    underscore: 'scripts/components/underscore/underscore',
    // used for demo
    resources: 'sample_resources',
    sinon: 'scripts/components/sinon.js/sinon'
  },

  shim: {
    // required for photic
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
    },
    // used for demo
    sinon: {
      exports: 'sinon'
    }
  }
});

require(
  [
    'scripts/app',
    'text!resources/photic.json',
    'sinon'
  ],
  function(app, photicJson) {
  // used for demo
  var server = sinon.fakeServer.create();

  // required for photic
  app();

  // used for demo
  var request = server.requests[0];
  request.respond(
    200,
    {"Content-Type": "application/json"},
    photicJson
  );
});
