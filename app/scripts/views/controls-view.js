define(
  [
    'text!templates/controls.html',
    'backbone',
    'handlebars'
  ],
  function(controlsTemplate) {

    var ControlsView = Backbone.View.extend({

      template: Handlebars.compile(controlsTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

    });

    return ControlsView;

  }
);
