define(
  [
    'handlebars',
    'photic/views/audio-elapsed-view',
    'photic/views/audio-progress-view',
    'photic/views/audio-volume-view',
    'photic/views/base-audio-view',
    'text!photic/templates/audio.html',
    'underscore'
  ],
  function(
    Handlebars,
    AudioElapsedView,
    AudioProgressView,
    AudioVolumeView,
    BaseAudioView,
    audioTemplate,
    _
  ) {
    var AudioView = BaseAudioView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'audioSrc',
          'pauseAudio',
          'playAudio',
          'render',
          'setAudioToCurrentSlide',
          'timeUpdate'
        );
        this.model.bind('toggleAudio', this.toggleAudio);
        this.model.bind('currentSlideChanged', this.setAudioToCurrentSlide);
        this.audioElapsedView = new AudioElapsedView({model: this.model});
        this.audioProgressView = new AudioProgressView({model: this.model});
        this.audioVolumeView = new AudioVolumeView({model: this.model});
      },

      timeUpdate: function(evt) {
        this.model.trigger('audioTimeUpdate', evt.target.currentTime);
      },

      audioSrc: function() { return this.model.get('audio'); },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        this.$el.html(this.template(this));
        this.audio().addEventListener('timeupdate', this.timeUpdate, false);
        this.assign({
          '#elapsed': this.audioElapsedView,
          '#progress': this.audioProgressView,
          '#volume': this.audioVolumeView
        });
        return this;
      },

      toggleAudio: function() {
        if (this.audio().is_playing) {
          this.pauseAudio();
        } else {
          this.playAudio();
        }
      },

      playAudio: function() {
        this.audio().play();
        this.model.trigger('playAudio', seekedTime);
      },

      pauseAudio: function() {
        this.audio().pause();
        this.model.trigger('pauseAudio', seekedTime);
      },

      setAudioToCurrentSlide: function(slide) {
        // Getting the error: Uncaught Error: INVALID_STATE_ERR: DOM Exception 11
        // This was only happening on the initial currentSlideChanged trigger
        // Added follwing if statement to circumvent
        if (this.audio().currentTime > 0) {
          this.audio().currentTime = slide.get('displayTime');
        }
        
      },

      destroy: function() {
        // remove event bindings
        this.model.off('playAudio', this.playAudio);
        this.model.off('pauseAudio', this.pauseAudio);
        this.audio().removeEventListener('timeupdate', this.timeUpdate, false);

        // destroy children
        this.audioElapsedView.destroy();
        this.audioProgressView.destroy();
        this.audioVolumeView.destroy();

        // remove self from DOM
        this.$el.empty();
      }
    });

    return AudioView;
  }
);
