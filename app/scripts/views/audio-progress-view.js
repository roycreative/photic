define(
  [
    'handlebars',
    'photic/views/base-audio-view',
    'text!photic/templates/audio-progress.html',
    'underscore'
  ],
  function(Handlebars, BaseAudioView, audioProgressTemplate, _) {
    var AudioProgressView = BaseAudioView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'audioLen',
          'changeAudioTime',
          'render',
          'updateProgressBar'
        );
        this.model.bind('audioTimeUpdate', this.updateProgressBar);
      },

      events: {
        'change #progressBar': 'changeAudioTime'
      },

      audioLen: function() { return this.model.get('audioLen'); },

      updateProgressBar: function(currentTime) {
        this.progressBar().val(currentTime);
      },

      changeAudioTime: function() {
        var seekedTime = this.progressBar().val();
        this.audio().currentTime = seekedTime;
        this.model.trigger('audioSeeked', seekedTime);
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
