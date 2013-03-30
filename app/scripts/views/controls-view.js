define(
  [
    'handlebars',
    'photic/views/base-view',
    'text!photic/templates/controls.html',
    'underscore'
  ],
  function(Handlebars, BaseView, controlsTemplate, _) {
    var ControlsView = BaseView.extend({
      initialize: function() {
        _.bindAll(this, 'render', 'nextSlide', 'previousSlide');
      },

      events: {
        'click .prevArrow': 'previousSlide',
        'click .nextArrow': 'nextSlide',
        'click .currentSlide': 'togglePlay',
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

      togglePlay: function(evt) {
        evt.preventDefault();
        this.model.trigger('toggleAudio');
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
