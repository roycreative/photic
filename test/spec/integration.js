define(
  [
    'chai',
    'photic/models/photic-model',
    'photic/routes/photic-router',
    'photic/views/photic-view',
    'text!resources/photic.json',
    'sinon',
    'mocha',
    'jquery',
    'backbone'
  ],
  function(
    chai,
    PhoticModel,
    PhoticRouter,
    PhoticView,
    photicData
  ) {
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
      }); // Routes
    }); // Photic Router

    describe('Views', function () {
      var photicModel, photicView, photicJson = JSON.parse(photicData);

      beforeEach(function() {
        photicModel = new PhoticModel(photicJson);
        photicView = new PhoticView({
          el: $('.photicPlayer'),
          model: photicModel
        });
        photicView.render();
      });

      afterEach(function() {
        photicView.destroy();
        photicModel.destroy();
      });

      describe('Photic View', function() {
        it('renders on load', function() {
          assert.include(photicView.$el.html(), photicJson.title,
                        'Rendered PhoticView contains title');
        });
      }); // Photic View


      describe('Slide View', function() {
        it('renders on load', function() {
          var firstSlide = photicModel.get('slides').at(0);
          assert.equal(
            photicView.slideshowView.currentSlideView.$el.html(),
            '',
            'SlideView does not render until current slide is set.'
          );
          photicModel.setCurrentSlide(firstSlide);
          assert.include(
            photicView.slideshowView.currentSlideView.$el.html(),
            firstSlide.get('photo').image,
            'Rendered SlideView contains slide img.'
          );
        });
      }); // Slide View
    
      describe('Photic Controls View', function() {
        beforeEach(function() {
          var firstSlide = photicModel.get('slides').at(0);
          photicModel.setCurrentSlide(firstSlide);
        });

        describe('Next button', function() {
          it('renders on load', function () {
            assert.lengthOf($('a.nextArrow'), 1, 'a.nextArrow created');
          });

          it('moves to the next slide when clicked', function() {
            var slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/450x300.gif',
                         '.slide is first data point');
            $('a.nextArrow').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/600x400.gif',
                         '.slide is second data point');
          });
        }); // Next button

        describe('Previous button', function() {
          it('renders on load', function () {
            assert.lengthOf($('a.prevArrow'), 1, 'a.prevArrow created');
          });

          it('moves to the previous slide when clicked', function() {
            var slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/450x300.gif',
                         '.slide is first data point');
            // move to the next slide
            $('a.nextArrow').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/600x400.gif',
                         '.slide is second data point');
            // move to the previous slide
            $('a.prevArrow').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/450x300.gif',
                         '.slide has returned to first data point');
          });
        }); // Previous button

        describe('Play button', function() {
          it('renders on load', function () {
            assert.lengthOf($('.currentSlide'), 1, 'a#play created');
          });

          it('starts the show from the beginning when clicked', function() {
            var playBtn = $('.currentSlide'),
              audio = $('#audio')[0],
              played = audio.played;
            assert.isTrue(audio.paused, 'audio is not playing');
            assert.equal(played.length, 0, 'audio has not been played');
            playBtn.trigger('click');
            assert.isFalse(audio.paused, 'audio is playing');
          });
        }); // Play button

        describe('Pause button', function() {
          it('pauses the slideshow and audio when clicked', function() {
            var playBtn = $('.currentSlide'),
              audio = $('#audio')[0],
              played = audio.played;
            assert.isTrue(audio.paused, 'audio is not playing');
            assert.equal(played.length, 0, 'audio has not been played');
            playBtn.trigger('click');
            assert.isFalse(audio.paused, 'audio is playing');
            playBtn.trigger('click');
            assert.isTrue(audio.paused, 'audio is paused');
          });
        }); // Pause button
      }); // Photic Controls View

      describe('Audio View', function() {
        it('renders on load', function () {
          var audio = $('audio#audio'),
            source = $('audio source');
          assert.lengthOf(audio, 1, 'audio#audio created');
          assert.lengthOf(source, 1, 'audio source created');
        });

        it('loads an audio source', function () {
          var source = $('audio source');
          assert.lengthOf(source, 1, 'audio source created');
          assert.equal(source.attr('src'), photicJson.audio,
                       'audio source set');
        });

        describe('Audio Elapsed View', function() {
          it('renders on load', function () {
            var elapsed = $('#elapsed'),
              elapsedDisplay = $('#elapsedDisplay');
            assert.lengthOf(elapsed, 1, '#elapsed created');
            assert.lengthOf(elapsedDisplay, 1, '#elapsedDisplay created');
          });
        }); // Audio Elapsed View

        describe('Audio Progress View', function() {
          it('renders on load', function () {
            var progress = $('#progress'),
              progressBar = $('#progressBar');
            assert.lengthOf(progress, 1, '#progress created');
            assert.lengthOf(progressBar, 1, '#progressBar created');
          });
        }); // Audio Progress View

        describe('Audio Volume View', function() {
          it('renders on load', function () {
            var volume = $('#volume'),
              volumeBar = $('#volumeBar');
            assert.lengthOf(volume, 1, '#volume created');
            assert.lengthOf(volumeBar, 1, '#volumeBar created');
          });
        }); // Audio Volume View
      }); // Audio View
    }); // Views
  }; // tests

  return tests;
});
