define(
  ['models/slide-model', 'collections/slides-collection', 'chai', 'mocha'],
  function(SlideModel, SlidesCollection, chai) {
  var tests = function() {

    assert = chai.assert;


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

      describe('Creation', function() {

        var slide;

        beforeEach(function() {
        });

        it('has expected number of models');

        it('tracks the current Slide model');

        it('emits a notification when the current Slide changes');

      });

    });

  };

  return tests
});
