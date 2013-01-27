define(
  [
    'scripts/views/slide-view',
    'text!scripts/templates/slideshow.html',
    'backbone',
    'handlebars'
  ], function(SlideView, slideshowTemplate) {

    var SlideshowView = Backbone.View.extend({

      tagName: 'div',

      className: 'slideshow-inner',

      initialize: function() {
        _.bindAll(this, 'render', 'render_slide');
        this.model.bind('currentSlideChanged', this.render_slide);
      },

      template: Handlebars.compile(slideshowTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      render_slide: function(slide) {
        var slideEl = this.$('.slide');
        this.currentSlideView = new SlideView({
          model: slide,
          el: slideEl
        });
        this.currentSlideView.render();
      }

    });

    return SlideshowView;
  }
);
