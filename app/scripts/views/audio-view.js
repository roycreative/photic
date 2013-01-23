define(
  [
    'text!scripts/templates/audio.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(audioTemplate) {
    var AudioView = Backbone.View.extend({

      initialize: function() {
        _.bindAll(
          this,
          'advanceProgressBar',
          'audioSrc',
          'playAudio',
          'progressBar',
          'render'
        );
        this.model.bind('playAudio', this.playAudio);
        this.model.bind('pauseAudio', this.pauseAudio);
      },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      advanceProgressBar: function(e) {
          this.progressBar().html(e.target.currentTime);
      },

      audio: _.memoize(function() {return document.getElementById('audio');}),

      progressBar: _.memoize(function() {return this.$('#progress-bar');}),

      playAudio: function() {
        this.audio().addEventListener('timeupdate', this.advanceProgressBar, false);
        this.audio().play();
      },

      pauseAudio: function() {
      },

      audioSrc: function() {return this.model.get('audioSrc');}
    });

    return AudioView;

  }
);
