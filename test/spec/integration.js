define(
  [
    'chai',
    'routes/photic-router',
    'text!resources/photic.json',
    'sinon',
    'mocha',
    'jquery',
    'backbone'
  ],
  function(chai, PhoticRouter, photicJson) {
  var tests = function() {

    assert = chai.assert;

    describe('Photic Router', function() {

      var router;

      beforeEach(function() {
        router = new PhoticRouter();
      })

      describe('Routes', function() {

        it('has routes', function() {
          assert.isObject(router.routes, 'router.routes is object');
        });

        it('has index', function() {
          assert.propertyVal(router.routes, 'photic/:_id', 'show_photic',
                             'router has index route');
        });

      });
    });

    describe('Views', function () {

      var router, server, callback;

      beforeEach(function() {
        router = new PhoticRouter();
        Backbone.history.start({silent: true});
        // change Backbone.history.fragment so subsequent 
        // calls to router.navigate run as expected
        Backbone.history.loadUrl('dummy/'); 
        server = sinon.fakeServer.create();
        callback = sinon.spy();
      });

      afterEach(function() {
        Backbone.history.stop();
        server.restore();
      });
      
      describe('Photic View', function() {

        it('renders on load', function() {
          router.navigate('photic/456', {trigger: true});
          assert.equal(server.requests.length, 1,
                       'One external request was made');
          var request = server.requests[0];
          request.respond(
            200,
            {"Content-Type": "application/json"},
            photicJson
          );
          assert.lengthOf($('.slideshow'), 1, '.slideshow created');
        });

      });


      describe('Slide View', function() {

        it('renders on load', function() {
          router.navigate('photic/456', {trigger: true});
          assert.equal(server.requests.length, 1,
                       'One external request was made');
          var request = server.requests[0];
          request.respond(
            200,
            {"Content-Type": "application/json"},
            photicJson
          );
          assert.lengthOf($('.slide'), 1, '.slide created');
        });

      });

    
      describe('Photic Controls View', function() {

        beforeEach(function() {
          router.navigate('photic/456', {trigger: true});
          assert.equal(server.requests.length, 1,
                       'One external request was made');
          var request = server.requests[0];
          request.respond(
            200,
            {"Content-Type": "application/json"},
            photicJson
          );
        });

        describe('Next button', function() {

          it('renders on load', function () {
            assert.lengthOf($('i.icon-forward'), 1, 'i.icon-forward created');
          });

          it('moves to the next slide when clicked');

          it('is disabled if there are no further slides');

        });

        describe('Previous button', function() {

          it('renders on load', function () {
            assert.lengthOf($('i.icon-backward'), 1, 'i.icon-backward created');
          });

          it('moves to the previous slide when clicked');

          it('is disabled if there are no further slides');

        });

        describe('Play button', function() {

          it('renders on load', function () {
            assert.lengthOf($('i.icon-play'), 1, 'i.icon-play created');
          });

          it('starts the show from the beginning when clicked');

          it('becomes a Pause button when clicked');

        });

        describe('Pause button', function() {

          it('pauses the slideshow and audio when clicked');

          it('becomes a Play button when clicked');

        });

      });

    });

  };

  return tests;
});
