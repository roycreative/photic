define(
  [
    'handlebars',
    'scripts/views/base-audio-view',
    'text!scripts/templates/audio-progress.html',
    'underscore'
  ],
  function(Handlebars, BaseAudioView, audioProgressTemplate, _) {
    var AudioProgressView = BaseAudioView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'audioLen',
          'playAudio',
          'render',
          'updateProgressBar'
        );
        this.model.bind('playAudio', this.playAudio);
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
        this.audio().addEventListener(
          'timeupdate', this.updateProgressBar, false);
      },

      destroy: function() {
        this.model.off('playAudio', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioProgressView;
  }
);
