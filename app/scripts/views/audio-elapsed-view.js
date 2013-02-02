define(
  [
    'handlebars',
    'scripts/views/base-view',
    'text!scripts/templates/audio-elapsed.html',
    'underscore'
  ],
  function(Handlebars, BaseView, audioElapsedTemplate, _) {
    var AudioElapsedView = BaseView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'render',
          'updateElapsedTime'
        );
        this.model.bind('audioTimeUpdate', this.updateElapsedTime);
      },

      elapsedDisplay: function() { return this.$('#elapsedDisplay'); },

      template: Handlebars.compile(audioElapsedTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      updateElapsedTime: function(currentTime) {
        var min = Math.floor(currentTime / 60),
          sec = Math.floor(currentTime  % 60);
        this.elapsedDisplay().html(min + ":" + sec);
      },

      destroy: function() {
        this.model.off('audioTimeUpdate', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioElapsedView;
  }
);
