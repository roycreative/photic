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

      volumeBar: _.memoize(function() {
        return this.$('#volumeBar');
      }),

      changeVolumeBar: function() {
        this.audio().volume = this.volumeBar().val();
      },

      template: Handlebars.compile(audioVolumeTemplate),

      render: function() {
        this.$el.html(this.template(this));
      },

      destroy: function() {
        this.$el.empty();
      }
    });

    return AudioVolumeView;
  }
);
