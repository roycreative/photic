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
        'click .icon-forward': 'nextSlide'
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
