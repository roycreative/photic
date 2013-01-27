require.config({
  paths: {
    // app paths
    backbone: 'scripts/components/backbone/backbone',
    handlebars: 'scripts/components/handlebars/handlebars-1.0.0-rc.1',
    jquery: 'scripts/components/jquery/jquery',
    relational: 'scripts/components/backbone-relational/backbone-relational',
    scripts: 'scripts',
    text: 'scripts/components/requirejs-text/text',
    underscore: 'scripts/components/underscore/underscore',
    // testing framework paths
    chai: "lib/chai",
    mocha: "lib/mocha/mocha",
    resources: "sample_resources",
    sinon: "lib/sinon",
    spec: "spec"
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

require(
  ['spec/unit', 'spec/integration', 'mocha'],
  function(unit, integration) {
    var unit_tests = unit();
    var integration_tests = integration();
    var runner = mocha.run();

    if(!window.PHANTOMJS) return;

    runner.on('test', function(test) {
      sendMessage('testStart', test.title);
    });

    runner.on('test end', function(test) {
      sendMessage('testDone', test.title, test.state);
    });

    runner.on('suite', function(suite) {
      sendMessage('suiteStart', suite.title);
    });

    runner.on('suite end', function(suite) {
      if (suite.root) return;
      sendMessage('suiteDone', suite.title);
    });

    runner.on('fail', function(test, err) {
      sendMessage('testFail', test.title, err);
    });

    runner.on('end', function() {
      var output = {
        failed  : this.failures,
        passed  : this.total - this.failures,
        total   : this.total
      };

      sendMessage('done', output.failed,output.passed, output.total);
    });

    function sendMessage() {
      var args = [].slice.call(arguments);
      alert(JSON.stringify(args));
    }
  }
);
