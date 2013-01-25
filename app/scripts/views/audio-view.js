define(
  [
    'scripts/views/audio-elapsed-view',
    'scripts/views/audio-progress-view',
    'text!scripts/templates/audio.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(AudioElapsedView, AudioProgressView, audioTemplate) {
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
        var audioElapsedView, audioProgressView;
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
