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
        'click .icon-backward': 'previousSlide',
        'click .icon-forward': 'nextSlide'
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

      template: Handlebars.compile(controlsTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

    });

    return ControlsView;

  }
);
