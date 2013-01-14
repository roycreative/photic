define(
  [
    'text!templates/audio.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(audioTemplate) {
    var AudioView = Backbone.View.extend({

      initialize: function() {
        _.bindAll(this, 'render', 'audioSrc');
        this.model.bind('playAudio', this.playAudio);
        this.model.bind('pauseAudio', this.pauseAudio);
      },

      template: Handlebars.compile(audioTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      audio: this.$('#audio'),

      playAudio: function() {
      },

      pauseAudio: function() {
      },

      audioSrc: function() {return this.model.get('audioSrc');}
    });

    return AudioView;

  }
);
