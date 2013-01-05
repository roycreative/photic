define(
  [
    'models/photic-model',
    'models/slide-model',
    'text!resources/photic.json',
    'chai',
    'sinon',
    'backbone',
    'underscore',
    'mocha'
  ],
  function(
    PhoticModel,
    SlideModel,
    photicJson,
    chai
  ) {
  var tests = function() {

    assert = chai.assert;
    assert.equalSlides = function (actualSlide, expected) {
      assert.equal(actualSlide.get("order"), expected.get("order"),
                   'actualSlide#order equals expected value');
      assert.equal(actualSlide.get("img"), expected.get("img"),
                   'actualSlide#img equals expected value');
      assert.equal(actualSlide.get("thumb"), expected.get("thumb"),
                   'actualSlide#thumb equals expected value');
      assert.equal(actualSlide.get("showSec"), expected.get("showSec"),
                   'actualSlide#showSec equals expected value');
    };


    describe('SlideModel', function() {

      describe('Creation', function() {

        var slide;

        beforeEach(function() {
          slide = new SlideModel({hi: 'guy'});
        });

      afterEach(function() {
        // Manually destroy the models we created to delete them from the
        // backbone-relational store
        var server = sinon.fakeServer.create();
        try {
          slide.destroy();
        } finally {
          server.restore();
        }
      });

      it('has arguments set', function() {
        assert.equal(slide.get('hi'), 'guy', 'Constructor arguments are set');
      });

      });

    });


    describe('PhoticModel', function() {

      var photicData = JSON.parse(photicJson);
      var photic;

      beforeEach(function() {
        photic = new PhoticModel(photicData);
      });

      afterEach(function() {
        var server = sinon.fakeServer.create();
        try {
          photic.get('slides').each(function(slide) {
            slide.destroy();
          });
          photic.destroy();
        } finally {
          server.restore();
        }
      });

      describe('Creation', function() {

        it('has expected number of models', function() {
          assert.equal(photic.get('slides').length, 4,
                       'Collection has expected number of slides');
        });

        it('loads related Slides', function() {
          var server = sinon.fakeServer.create(),
            callback = sinon.spy(),
            request;
          try {
            photic = null;
            photic = new PhoticModel();
            photic.fetch({success: callback});
            assert.equal(server.requests.length, 1, 'One external request was made');
            request = server.requests[0];
            request.respond(
              200,
              {"Content-Type": "application/json"},
              photicJson
            );
            assert(callback.called, 'PhoticModel#fetch ran successfully');
            assert.equal(photic.get('slides').length, 4, 'PhoticModel fetched and loaded');
            assert.equalSlides(
              photic.get('slides').models[0],
              SlideModel.findOrCreate(photicData['slides'][0])
            );
          } finally {
            server.restore();
          }
        });

      });

      describe('Changing Slides', function() {

        it('defaults currentSlide to the first Slide', function () {
          var currentSlide = photic.getCurrentSlide();
          assert.equalSlides(
            currentSlide,
            SlideModel.findOrCreate(photicData['slides'][0])
          );
        });

        it('gets the next slide on #getNextSlide', function () {
          var nextSlide = photic.getNextSlide();
          assert.equalSlides(
            nextSlide,
            SlideModel.findOrCreate(photicData['slides'][1])
          );
        });

        it('gets the previous slide on #getPreviousSlide', function () {
          var previousSlide = photic.getPreviousSlide();
          assert.equalSlides(
            previousSlide,
            SlideModel.findOrCreate(photicData['slides'][3])
          );
        });

        it('changes currentSlide on #setCurrentSlide', function() {
          var nextSlide = photic.getNextSlide();
          photic.setCurrentSlide(nextSlide);
          var currentSlide = photic.getCurrentSlide();
          assert.equalSlides(
            currentSlide,
            SlideModel.findOrCreate(photicData['slides'][1]));
        });

        it('emits a notification when the current Slide changes', function() {
          var callback = sinon.spy(),
            nextSlide = photic.getNextSlide();
          photic.on('currentSlideChanged', callback);
          photic.setCurrentSlide(nextSlide);
          assert(callback.called, '"currentSlideChanged" event was fired');
          assert.equalSlides(callback.args[0][0], nextSlide);
        });

      });

    });

  };

  return tests
});
