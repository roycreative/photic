define(
  [
    'handlebars',
    'scripts/views/base-view',
    'text!scripts/templates/controls.html',
    'underscore'
  ],
  function(Handlebars, BaseView, controlsTemplate, _) {
    var ControlsView = BaseView.extend({
      initialize: function() {
        _.bindAll(this, 'render', 'nextSlide', 'previousSlide');
      },

      events: {
        'click #prev': 'previousSlide',
        'click #next': 'nextSlide',
        'click #play': 'play',
        'click #pause': 'pause'
      },

      previousSlide: function(evt) {
        evt.preventDefault();
        var prev = this.model.getPreviousSlide();
        this.model.setCurrentSlide(prev);
      },

      nextSlide: function(evt) {
        evt.preventDefault();
        var next = this.model.getNextSlide();
        this.model.setCurrentSlide(next);
      },

      play: function(evt) {
        evt.preventDefault();
        var btn = $(evt.target),
          icon = btn.children('i');
        btn.attr('id', 'pause');
        // display pause icon
        icon.addClass('icon-pause');
        icon.removeClass('icon-play');
        this.model.trigger('playAudio');
      },

      pause: function(evt) {
        evt.preventDefault();
        var btn = $(evt.target),
          icon = btn.children('i');
        btn.attr('id', 'play');
        // display play icon
        icon.addClass('icon-play');
        icon.removeClass('icon-pause');
        this.model.trigger('pauseAudio');
      },

      template: Handlebars.compile(controlsTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      destroy: function() {
        this.$el.empty();
      }
    });

    return ControlsView;
  }
);
