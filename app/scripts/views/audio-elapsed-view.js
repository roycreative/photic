define(
  [
    'handlebars',
    'scripts/views/base-audio-view',
    'text!scripts/templates/audio-elapsed.html',
    'underscore'
  ],
  function(Handlebars, BaseAudioView, audioElapsedTemplate, _) {
    var AudioElapsedView = BaseAudioView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'playAudio',
          'render',
          'updateElapsedTime'
        );
        this.model.bind('playAudio', this.playAudio);
      },

      elapsedDisplay: _.memoize(function() {
        return this.$('#elapsedDisplay');
      }),

      template: Handlebars.compile(audioElapsedTemplate),

      render: function() {
        this.$el.html(this.template(this));
      },

      playAudio: function() {
        this.audio().addEventListener(
          'timeupdate', this.updateElapsedTime, false);
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
