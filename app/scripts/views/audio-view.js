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
      },

      audio: _.memoize(function() {
        return document.getElementById('audio');
      }),
      
      audioSrc: function() { return this.model.get('audioSrc'); },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        var audioElapsedView, audioProgressView, audioVolumeView;
        this.$el.html(this.template(this));
        audioElapsedView = new AudioElapsedView({
          el: this.$('#elapsed'),
          model: this.model,
          audio: this.audio()
        });
        audioElapsedView.render();
        audioProgressView = new AudioProgressView({
          el: this.$('#progress'),
          model: this.model,
          audio: this.audio()
        });
        audioProgressView.render();
        audioVolumeView = new AudioVolumeView({
          el: this.$('#volume'),
          model: this.model,
          audio: this.audio()
        });
        audioVolumeView.render();
        return this;
      },

      playAudio: function() {
        this.audio().play();
      },

      pauseAudio: function() {
        this.audio().pause();
      }
    });

    return AudioView;
  }
);
