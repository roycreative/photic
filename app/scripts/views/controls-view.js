define(
  [
    'text!templates/controls.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function(controlsTemplate) {

    var ControlsView = Backbone.View.extend({

      initialize: function() {
        _.bindAll(this, 'render', 'nextSlide');
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
      },

      pause: function(evt) {
        evt.preventDefault();
        var btn = $(evt.target),
          icon = btn.children('i');
        btn.attr('id', 'play');
        // display play icon
        icon.addClass('icon-play');
        icon.removeClass('icon-pause');
      },

      template: Handlebars.compile(controlsTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      }

    });

    return ControlsView;

  }
);
