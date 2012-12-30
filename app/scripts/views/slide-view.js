define(
  ['backbone', 'handlebars', 'text!templates/slide.html'],
  function (Backbone, Handlebars, slideTemplate) {

    photic.Views.slideView = Backbone.View.extend({

      render: function() {
        var self = this;
        var template = Handlebars.compile(slideTemplate);
        self.$el.html(template());
        return this;
      }

    });
  }
);
