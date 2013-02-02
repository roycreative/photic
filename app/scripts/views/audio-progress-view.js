define(
  [
    'text!scripts/templates/audio-progress.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(audioProgressTemplate) {
    var AudioProgressView = Backbone.View.extend({
      initialize: function(opts) {
        _.bindAll(
          this,
          'audioLen',
          'playAudio',
          'render',
          'updateProgressBar'
        );
        this.model.bind('playAudio', this.playAudio);
        this.audio = opts.audio;
      },

      audioLen: function() { return this.model.get('audioLen'); },

      updateProgressBar: function(e) {
        var time = e.target.currentTime;
        this.progressBar().val(time);
      },

      progressBar: _.memoize(function() {
        return this.$('#progressBar');
      }),

      template: Handlebars.compile(audioProgressTemplate),

      render: function() {
        this.$el.html(this.template(this));
      },

      playAudio: function() {
        this.audio.addEventListener('timeupdate', this.updateProgressBar, false);
      },

      destroy: function() {
        this.model.off('playAudio', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioProgressView;
  }
);
