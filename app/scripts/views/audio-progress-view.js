define(
  [
    'handlebars',
    'scripts/views/base-view',
    'text!scripts/templates/audio-progress.html',
    'underscore'
  ],
  function(Handlebars, BaseView, audioProgressTemplate, _) {
    var AudioProgressView = BaseView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'audioLen',
          'render',
          'updateProgressBar'
        );
        this.model.bind('audioTimeUpdate', this.updateProgressBar);
      },

      audioLen: function() { return this.model.get('audioLen'); },

      updateProgressBar: function(currentTime) {
        this.progressBar().val(currentTime);
      },

      progressBar: function() { return this.$('#progressBar'); },

      template: Handlebars.compile(audioProgressTemplate),

      render: function() {
        this.$el.html(this.template(this));
      },

      destroy: function() {
        this.model.off('audioTimeUpdate', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioProgressView;
  }
);
