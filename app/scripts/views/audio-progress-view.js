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
          'changeAudioTime',
          'clickProgressBar',
          'handleSlideChange',
          'render',
          'slides',
          'updateProgressBar'
        );
        this.model.bind('audioTimeUpdate', this.updateProgressBar);
        this.model.bind('currentSlideChanged', this.handleSlideChange);
      },

      events: {
        // TODO: we'll need drag&drop
        // TODO: the markup of #progressBar doesn't seem to be
        // clickable right now
        'click': 'clickProgressBar'
      },

      clickProgressBar: function(e) {
        console.log(e);
      },

      updateProgressBar: function(currentTime) {
        var percentComplete = currentTime / this.model.get('audioLength');
        percentComplete = percentComplete * 100;
        this.progressBar().css('left', percentComplete.toFixed(2) + '%');
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

      progressBar: function() { return this.$('#progressIndicator'); },

      slides: function() { 
        var mapSlides = this.model.get('slides').map(function(slide) {
          var percent = (slide.get('displayTime') / this.audioLength) * 100,
            thumbImage = slide.get('photo').thumbImage || '';
          return {percent: percent.toFixed(2), thumbImage: thumbImage}
        }, {audioLength: this.model.get('audioLength')});
        return mapSlides;
      },

      template: Handlebars.compile(audioProgressTemplate),

      render: function() {
        this.$el.html(this.template({slides: this.slides()}));
      },

      destroy: function() {
        this.model.off('audioTimeUpdate', this.playAudio);
        this.$el.empty();
      }
    });

    return AudioProgressView;
  }
);
