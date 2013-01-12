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

          it('moves to the next slide when clicked', function() {
            var slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'), 'resources/450x300.gif',
                         '.slide is first data point');
            $('i.icon-forward').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'), 'resources/600x400.gif',
                         '.slide is second data point');
          });

        });

        describe('Previous button', function() {

          it('renders on load', function () {
            assert.lengthOf($('i.icon-backward'), 1, 'i.icon-backward created');
          });

          it('moves to the previous slide when clicked');

        });

        describe('Play button', function() {

          it('renders on load', function () {
            assert.lengthOf($('i.icon-play'), 1, 'i.icon-play created');
          });

          it('starts the show from the beginning when clicked');

          it('becomes a Pause button when clicked', function() {
            var play = $('i.icon-play');
            assert.isTrue(play.hasClass('icon-play'),
                          'Has .icon-play before click');
            assert.isFalse(play.hasClass('icon-pause'),
                           'No .icon-pause before click');
            play.trigger('click');
            assert.isTrue(play.hasClass('icon-pause'),
                          'Has .icon-pause after click');
            assert.isFalse(play.hasClass('icon-play'),
                           'No .icon-play after click');
          });

        });

        describe('Pause button', function() {

          it('pauses the slideshow and audio when clicked');

          it('becomes a play button when clicked', function() {
            var play = $('i.icon-play');
            assert.isTrue(play.hasClass('icon-play'),
                          'Has .icon-play before Play click');
            assert.isFalse(play.hasClass('icon-pause'),
                           'No .icon-pause before Play click');
            play.trigger('click');
            var pause = $('i.icon-pause');
            assert.isTrue(pause.hasClass('icon-pause'),
                          'Has .icon-pause after Play click');
            assert.isFalse(pause.hasClass('icon-play'),
                           'No .icon-play after Play click');
            pause.trigger('click');
            assert.isTrue(pause.hasClass('icon-play'),
                          'Has .icon-play after Pause click');
            assert.isFalse(pause.hasClass('icon-pause'),
                           'No .icon-pause after Pause click');
          });

        });

      });

    });

  };

  return tests;
});
