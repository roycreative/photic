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
          'pauseAudio',
          'playAudio',
          'progressBar',
          'render'
        );
        this.model.bind('playAudio', this.playAudio);
        this.model.bind('pauseAudio', this.pauseAudio);
      },

      // DOM helpers

      audio: _.memoize(function() {return document.getElementById('audio');}),

      progressBar: _.memoize(function() {return this.$('#progress-bar');}),
      
      // template helpers

      audioSrc: function() {return this.model.get('audioSrc');},

      template: Handlebars.compile(audioTemplate),

      // display functions

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      advanceProgressBar: function(e) {
          this.progressBar().html(e.target.currentTime);
      },

      // audio functions

      playAudio: function() {
        this.audio().addEventListener('timeupdate', this.advanceProgressBar, false);
        this.audio().play();
      },

      pauseAudio: function() {
        this.audio().pause();
      },

    });

    return AudioView;

  }
);
