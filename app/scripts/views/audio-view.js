define(
  [
    'scripts/views/audio-elapsed-view',
    'scripts/views/audio-progress-view',
    'scripts/views/audio-volume-view',
    'text!scripts/templates/audio.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(
    AudioElapsedView,
    AudioProgressView,
    AudioVolumeView,
    audioTemplate
  ) {
    var AudioView = Backbone.View.extend({
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
        this.audioElapsedView = {destroy: function() {}};
        this.audioProgressView = {destroy: function() {}};
        this.audioVolumeView = {destroy: function() {}};
      },

      audio: _.memoize(function() {
        return document.getElementById('audio');
      }),
      
      audioSrc: function() { return this.model.get('audioSrc'); },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        this.$el.html(this.template(this));
        this.audioElapsedView = new AudioElapsedView({
          el: this.$('#elapsed'),
          model: this.model,
          audio: this.audio()
        });
        this.audioElapsedView.render();
        this.audioProgressView = new AudioProgressView({
          el: this.$('#progress'),
          model: this.model,
          audio: this.audio()
        });
        this.audioProgressView.render();
        this.audioVolumeView = new AudioVolumeView({
          el: this.$('#volume'),
          model: this.model,
          audio: this.audio()
        });
        this.audioVolumeView.render();
        return this;
      },

      playAudio: function() {
        this.audio().play();
      },

      pauseAudio: function() {
        this.audio().pause();
      },

      destroy: function() {
        // destroy children
        this.audioElapsedView.destroy();
        this.audioProgressView.destroy();
        this.audioVolumeView.destroy();

        // remove event bindings
        this.model.off('playAudio', this.playAudio);
        this.model.off('pauseAudio', this.pauseAudio);

        // remove self from DOM
        this.$el.empty();
      }
    });

    return AudioView;
  }
);
