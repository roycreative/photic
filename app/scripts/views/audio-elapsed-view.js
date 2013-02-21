define(
  [
    'handlebars',
    'photic/views/base-view',
    'text!photic/templates/audio-elapsed.html',
    'underscore'
  ],
  function(Handlebars, BaseView, audioElapsedTemplate, _) {
    var AudioElapsedView = BaseView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'handleSlideChange',
          'render',
          'updateElapsedTime'
        );
        this.model.bind('audioTimeUpdate', this.updateElapsedTime);
        this.model.bind('currentSlideChanged', this.handleSlideChange);
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

      handleSlideChange: function(slide) {
        this.updateElapsedTime(slide.get('displayTime'));
      },

      destroy: function() {
        this.model.off('audioTimeUpdate', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioElapsedView;
  }
);
