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
          'handleSlideChange',
          'render',
          'updateProgressBar'
        );
        this.model.bind('audioTimeUpdate', this.updateProgressBar);
        this.model.bind('currentSlideChanged', this.handleSlideChange);
      },

      events: {
        'change #progressBar': 'changeAudioTime'
      },

      audioLen: function() { return this.model.get('audioLength'); },

      updateProgressBar: function(currentTime) {
        this.progressBar().val(currentTime);
      },
      
      handleSlideChange: function(slide) {
        this.updateProgressBar(slide.get('displayTime'));
      },

      changeAudioTime: _.throttle(
        function() {
          var seekedTime = this.progressBar().val(),
            audio = this.audio();
          this.model.trigger('audioSeeked', seekedTime);
          // TODO: Nasty timing issue. Setting audio.currentTime triggers the audio
          // element's "timeupdate" event. This triggers audio-view.timeUpdate which
          // triggers an event with evt.target.currentTime. I've introduced the delay
          // below because the target's currentTime wasn't being updated without it
          _.delay(function() { audio.currentTime = seekedTime; }, 500);
        }, 500),

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
