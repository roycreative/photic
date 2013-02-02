define(
  [
    'handlebars',
    'scripts/views/audio-elapsed-view',
    'scripts/views/audio-progress-view',
    'scripts/views/audio-volume-view',
    'scripts/views/base-audio-view',
    'text!scripts/templates/audio.html',
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
          'render'
        );
        this.model.bind('playAudio', this.playAudio);
        this.model.bind('pauseAudio', this.pauseAudio);
        this.audioElapsedView = new AudioElapsedView({model: this.model});
        this.audioProgressView = new AudioProgressView({model: this.model});
        this.audioVolumeView = new AudioVolumeView({model: this.model});
      },

      audioSrc: function() { return this.model.get('audioSrc'); },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        this.$el.html(this.template(this));
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
