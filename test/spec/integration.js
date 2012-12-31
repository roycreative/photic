define(
  ['routes/photic-router', 'chai', 'mocha', 'jquery', 'backbone'],
  function(PhoticRouter, chai) {
    var tests = function() {

      assert = chai.assert;

      // router tests
      describe('Photic Router', function() {

        var router;

        beforeEach(function() {
          router = new PhoticRouter({el: $('#photic')});
        })

        describe('Routes', function() {

          it('has routes', function() {
            assert.isObject(router.routes, 'router.routes is object');
          });

          it('has index', function() {
            assert.propertyVal(router.routes, '', 'index', 'router has index route');
          });

        });
      });

      // photic view tests
      describe('Photic View', function() {

        var router;

        beforeEach(function() {
          router = new PhoticRouter();
          Backbone.history.start({silent: true});
          // change Backbone.history.fragment so subsequent 
          // calls to router.navigate run as expected
          Backbone.history.loadUrl('dummy/'); 
        });

        afterEach(function() {
          Backbone.history.stop();
        });

        it('renders', function() {
          router.navigate('', {trigger: true});
          assert.lengthOf($('.slideshow'), 1, '.slideshow created');
        });

      });

    };

    return tests;
  }
);
