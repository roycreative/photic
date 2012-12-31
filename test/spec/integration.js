define(
  ['routes/photic-router', 'chai', 'mocha', 'jquery'],
  function(PhoticRouter, chai) {
    var tests = function() {

      assert = chai.assert;

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

    };

    return tests
  }
);
