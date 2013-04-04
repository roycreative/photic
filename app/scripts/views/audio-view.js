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
          'audioLength',
          'audioSrc',
          'pauseAudio',
          'playAudio',
          'render',
          'setAudioToCurrentSlide',
          'timeUpdate',
          'toggleAudio'
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

      audioLength: function() {
        var audioLength = this.model.get('audioLength'),
          min = Math.floor(audioLength / 60),
          sec = Math.floor(audioLength  % 60);
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
        return min + ':' + sec
      },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        this.$el.html(this.template(this));
        this.audio().addEventListener('timeupdate', this.timeUpdate, false);
        this.assign({
          '.timeElapsed': this.audioElapsedView,
          '#progress': this.audioProgressView,
          // '#volume': this.audioVolumeView
        });
        return this;
      },

      toggleAudio: function() {
        if (this.audio().paused) {
          this.playAudio();
        } else {
          this.pauseAudio();
        }
      },

      playAudio: function() {
        this.audio().play();
        this.model.trigger('playAudio');
      },

      pauseAudio: function() {
        this.audio().pause();
        this.model.trigger('pauseAudio');
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
