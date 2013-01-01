define(
  [
    'models/slide-model',
    'collections/slides-collection',
    'text!resources/slides.json',
    'backbone',
    'underscore',
    'chai',
    'sinon',
    'mocha'
  ],
  function(
    SlideModel,
    SlidesCollection,
    slidesJson,
    Backbone,
    _,
    chai,
    sinon
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

        it('has arguments set', function() {
          assert.equal(slide.get('hi'), 'guy', 'Constructor arguments are set');
        });

      });

    });


    describe('SlidesCollection', function() {

      var slideData = JSON.parse(slidesJson);
      var slides;

      beforeEach(function() {
        slides = new SlidesCollection(slideData);
      });

      describe('Creation', function() {

        it('has expected number of models', function() {
          assert.equal(slides.length, 4,
                       'Collection has expected number of slides');
        });

      });

      describe('Changing Slides', function() {

        it('defaults currentSlide to the first Slide', function () {
          var currentSlide = slides.getCurrentSlide();
          assert.equalSlides(currentSlide, new SlideModel(slideData[0]));
        });

        it('gets the next slide on #getNextSlide', function () {
          var nextSlide = slides.getNextSlide();
          assert.equalSlides(nextSlide, new SlideModel(slideData[1]));
        });

        it('gets the previous slide on #getPreviousSlide', function () {
          var previousSlide = slides.getPreviousSlide();
          assert.equalSlides(previousSlide, new SlideModel(slideData[3]));
        });

        it('changes currentSlide on #setCurrentSlide', function() {
          var nextSlide = slides.getNextSlide();
          slides.setCurrentSlide(nextSlide);
          var currentSlide = slides.getCurrentSlide();
          assert.equalSlides(currentSlide, new SlideModel(slideData[1]));
        });

          
        it('emits a notification when the current Slide changes', function() {
          var callback = sinon.spy(),
            nextSlide = slides.getNextSlide();
          slides.on('currentSlideChanged', callback);
          slides.setCurrentSlide(nextSlide);
          assert(callback.called, '"currentSlideChanged" event was fired');
          assert.equalSlides(callback.args[0][0], nextSlide);
        });

      });

    });

  };

  return tests
});
