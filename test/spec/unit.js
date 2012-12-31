define([
        'models/slide-model', 'chai', 'mocha'],
        function(SlideModel, chai) {
  var unitTests = function() {
    assert = chai.assert;
    describe('SlideModel', function() {
      describe('Creation', function() {
        var slide;
        beforeEach(function() {
          slide = new SlideModel({hi: 'guy'});
        });

        it('have arguments set', function() {
          assert.equal(slide.get('hi'), 'guy', 'Constructor arguments are set');
        });

      });
    });
  };
  return unitTests;
});
