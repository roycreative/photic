require.config({
  paths: {
    // required for photic
    backbone: 'components/backbone/backbone',
    handlebars: 'components/handlebars/handlebars-1.0.0-rc.1',
    jquery: 'components/jquery/jquery',
    relational: 'components/backbone-relational/backbone-relational',
    text: 'components/requirejs-text/text',
    underscore: 'components/underscore/underscore',
    // used for demo
    resources: 'sample_resources',
    sinon: 'components/sinon.js/sinon'
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
    'app',
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
