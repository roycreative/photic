define(
  [
    'text!scripts/templates/audio-elapsed.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(audioElapsedTemplate) {
    var AudioElapsedView = Backbone.View.extend({
      initialize: function(opts) {
        _.bindAll(
          this,
          'playAudio',
          'render',
          'updateElapsedTime'
        );
        this.model.bind('playAudio', this.playAudio);
        this.audio = opts.audio;
      },

      elapsedDisplay: _.memoize(function() {
        return this.$('#elapsedDisplay');
      }),

      template: Handlebars.compile(audioElapsedTemplate),

      render: function() {
        this.$el.html(this.template(this));
      },

      playAudio: function() {
        this.audio.addEventListener('timeupdate', this.updateElapsedTime, false);
      },

      updateElapsedTime: function(e) {
        var time = e.target.currentTime,
          min = Math.floor(time / 60),
          sec = Math.floor(time % 60);
        this.elapsedDisplay().html(min + ":" + sec);
      },

      destroy: function() {
        this.model.off('playAudio', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioElapsedView;
  }
);
