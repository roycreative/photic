define(
  [
    'text!scripts/templates/audio-volume.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(audioVolumeTemplate) {
    var AudioVolumeView = Backbone.View.extend({
      initialize: function(opts) {
        _.bindAll(
          this,
          'render',
          'changeVolumeBar'
        );
        this.audio = opts.audio;
      },

      events: {
        'change #volumeBar': 'changeVolumeBar'
      },

      volumeBar: _.memoize(function() {
        return this.$('#volumeBar');
      }),

      changeVolumeBar: function() {
        this.audio.volume = this.volumeBar().val();
      },

      template: Handlebars.compile(audioVolumeTemplate),

      render: function() {
        this.$el.html(this.template(this));
      }
    });

    return AudioVolumeView;
  }
);
