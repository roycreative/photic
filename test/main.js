require.config({
  baseUrl: "../app/scripts",
  paths: {
    // app paths
    backbone: 'components/backbone/backbone',
    handlebars: 'components/handlebars/handlebars-1.0.0-rc.1',
    jquery: 'components/jquery/jquery',
    text: 'components/requirejs-text/text',
    underscore: 'components/underscore/underscore',
    // testing framework paths
    chai: "../../test/lib/chai",
    mocha: "../../test/lib/mocha/mocha",
    spec: "../../test/spec"
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
      init: function() {
        this.mocha.setup('bdd');
        return this.mocha;
      }
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
