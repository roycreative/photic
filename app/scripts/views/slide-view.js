define(
  ['text!scripts/templates/slide.html', 'backbone', 'handlebars'],
  function (slideTemplate) {

    var SlideView = Backbone.View.extend({

      initialize: function() {
        _.bindAll(this, 'render', 'imgSrc');
      },

      template: Handlebars.compile(slideTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      imgSrc: function() {return this.model.get('img');},

      destroy: function() {
        this.$el.empty();
      }

    });

    return SlideView;
  }
);
