define(
  ['backbone', 'handlebars', 'text!templates/slideshow.html'],
  function(Backbone, Handlebars, slideshowTemplate) {

    photic.Views.slideshowView = Backbone.View.extend({

      render: function() {
        var self = this;
        var template = Handlebars.compile(slideshowTemplate);
        self.$el.html(template());
        return this;
      }

    });
  }
);
