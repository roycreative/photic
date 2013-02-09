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
          'timeUpdate'
        );
        this.model.bind('playAudio', this.playAudio);
        this.model.bind('pauseAudio', this.pauseAudio);
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
        this.audio().removeEventListener('timeupdate', this.timeUpdate, false);
        this.audio().addEventListener('timeupdate', this.timeUpdate, false);
        this.assign({
          '#elapsed': this.audioElapsedView,
          '#progress': this.audioProgressView,
          '#volume': this.audioVolumeView
        });
        return this;
      },

      playAudio: function() {
        this.audio().play();
      },

      pauseAudio: function() {
        this.audio().pause();
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
