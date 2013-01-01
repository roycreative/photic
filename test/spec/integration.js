define(
  ['routes/photic-router', 'chai', 'mocha', 'jquery', 'backbone'],
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

      it('renders on load', function() {
        router.navigate('', {trigger: true});
        assert.lengthOf($('.slideshow'), 1, '.slideshow created');
      });

      it('loads a SlideCollection');

    });


    describe('Slide View', function() {

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

      it('renders on load');

    });

  
    describe('Photic Controls View', function() {

      describe('Next button', function() {

        it('renders on load');

        it('moves to the next slide');

        it('is disabled if there are no further slides');

      });

      describe('Previous button', function() {

        it('renders on load');

        it('moves to the next slide');

        it('is disabled if there are no further slides');

      });

      describe('Play button', function() {

        it('renders on load');

        it('starts the show from the beginning when clicked');

        it('becomes a Pause button when clicked');

      });

      describe('Pause button', function() {

        it('renders on load');

        it('pauses the slideshow and audio when clicked');

        it('becomes a Play button when clicked');

      });

    });

  };

  return tests;
});
