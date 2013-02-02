define(
  [
    'chai',
    'scripts/models/photic-model',
    'scripts/routes/photic-router',
    'scripts/views/photic-view',
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
          el: $('#photic'),
          model: photicModel
        });
        photicView.render();
      });

      afterEach(function() {
//        photicView.destroy();
//        photicModel.destroy();
      });

      describe('Photic View', function() {
        it.only('renders on load', function() {
          assert.lengthOf(photicView.$('.slideshow'), 1, '.slideshow created');
        });
      }); // Photic View


      describe('Slide View', function() {
        it('renders on load', function() {
          assert.lengthOf(photicView.$('.slide'), 1, '.slide created');
        });
      }); // Slide View
    
      describe('Photic Controls View', function() {
        describe('Next button', function() {
          it('renders on load', function () {
            assert.lengthOf($('a#next'), 1, 'a#next created');
            assert.lengthOf($('i.icon-forward'), 1, 'i.icon-forward created');
          });

          it('moves to the next slide when clicked', function() {
            var slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/450x300.gif',
                         '.slide is first data point');
            $('a#next').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/600x400.gif',
                         '.slide is second data point');
          });
        }); // Next button

        describe('Previous button', function() {
          it('renders on load', function () {
            assert.lengthOf($('a#prev'), 1, 'a#prev created');
            assert.lengthOf($('i.icon-backward'), 1, 'i.icon-backward created');
          });

          it('moves to the previous slide when clicked', function() {
            var slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/450x300.gif',
                         '.slide is first data point');
            // move to the next slide
            $('a#next').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/600x400.gif',
                         '.slide is second data point');
            // move to the previous slide
            $('a#prev').trigger('click');
            slideImg = $('.slide img');
            assert.equal(slideImg.attr('src'),
                         'sample_resources/450x300.gif',
                         '.slide has returned to first data point');
          });
        }); // Previous button

        describe('Play button', function() {
          it('renders on load', function () {
            assert.lengthOf($('a#play'), 1, 'a#play created');
            assert.lengthOf($('i.icon-play'), 1, 'i.icon-play created');
          });

          it('starts the show from the beginning when clicked', function() {
            var playBtn = $('a#play'),
              audio = $('#audio')[0],
              played = audio.played;
            assert.isTrue(audio.paused, 'audio is not playing');
            assert.equal(played.length, 0, 'audio has not been played');
            playBtn.trigger('click');
            // TODO: AudioControl.playAudio is triggered but audio is
            // still paused.
            assert.isFalse(audio.paused, 'audio is playing');
            assert.equal(played.length, 1, 'audio been played');
          });

          it('becomes a Pause button when clicked', function() {
            var playBtn = $('a#play');
            var playIcon = $('i.icon-play');
            assert.isTrue(playIcon.hasClass('icon-play'),
                          'Has .icon-play before click');
            assert.isFalse(playIcon.hasClass('icon-pause'),
                           'No .icon-pause before click');
            playBtn.trigger('click');
            pauseIcon = $('i.icon-pause');
            assert.isTrue(pauseIcon.hasClass('icon-pause'),
                          'Has .icon-pause after click');
            assert.isFalse(pauseIcon.hasClass('icon-play'),
                           'No .icon-play after click');
          });
        }); // Play button

        describe('Pause button', function() {
          it('pauses the slideshow and audio when clicked');

          it('becomes a play button when clicked', function() {
            var playBtn = $('a#play');
            var playIcon = $('i.icon-play');
            assert.isTrue(playIcon.hasClass('icon-play'),
                          'Has .icon-play before Play click');
            assert.isFalse(playIcon.hasClass('icon-pause'),
                           'No .icon-pause before Play click');
            playBtn.trigger('click');
            var pauseBtn = $('a#pause');
            var pauseIcon = $('i.icon-pause');
            assert.isTrue(pauseIcon.hasClass('icon-pause'),
                          'Has .icon-pause after Play click');
            assert.isFalse(pauseIcon.hasClass('icon-play'),
                           'No .icon-play after Play click');
            pauseBtn.trigger('click');
            assert.isTrue(pauseIcon.hasClass('icon-play'),
                          'Has .icon-play after Pause click');
            assert.isFalse(pauseIcon.hasClass('icon-pause'),
                           'No .icon-pause after Pause click');
          });
        }); // Pause button
      }); // Photic Controls View

      describe('Audio View', function() {

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

        it('renders on load', function () {
          var audio = $('audio#audio'),
            source = $('audio source');
          assert.lengthOf(audio, 1, 'audio#audio created');
          assert.lengthOf(source, 1, 'audio source created');
        });

        it('loads an audio source', function () {
          var source = $('audio source');
          assert.lengthOf(source, 1, 'audio source created');
          assert.equal(source.attr('src'), photicJson.audioSrc,
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
