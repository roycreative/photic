define(
  [
    'handlebars',
    'scripts/views/base-view',
    'text!scripts/templates/slide.html'
  ], function (Handlebars, BaseView, slideTemplate) {

    var SlideView = BaseView.extend({
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
