define(
  [
    'handlebars',
    'scripts/views/base-audio-view',
    'text!scripts/templates/audio-volume.html',
    'underscore'
  ],
  function(Handlebars, BaseAudioView, audioVolumeTemplate, _) {
    var AudioVolumeView = BaseAudioView.extend({
      initialize: function() {
        _.bindAll(
          this,
          'render',
          'changeVolumeBar'
        );
      },

      events: {
        'change #volumeBar': 'changeVolumeBar'
      },

      volumeBar: function() { return this.$('#volumeBar'); },

      changeVolumeBar: function() {
        this.audio().volume = this.volumeBar().val();
      },

      template: Handlebars.compile(audioVolumeTemplate),

      render: function() {
        this.$el.html(this.template(this));
      },

      destroy: function() {
        this.undelegateEvents();
        this.$el.empty();
      }
    });

    return AudioVolumeView;
  }
);
