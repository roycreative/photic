define(
  [
    'handlebars',
    'photic/views/base-view',
    'photic/views/slide-view',
    'text!photic/templates/slideshow.html'
  ], function(Handlebars, BaseView, SlideView, slideshowTemplate) {

    var SlideshowView = BaseView.extend({
      initialize: function() {
        _.bindAll(this, 'render', 'render_slide');
        this.model.bind('currentSlideChanged', this.render_slide);
        this.currentSlideView = new SlideView();
      },

      template: Handlebars.compile(slideshowTemplate),

      render: function() {
        this.$el.html(this.template(this));
        return this;
      },

      render_slide: function(slide) {
        this.currentSlideView.model = slide;
        this.assign('.slide', this.currentSlideView);
        return this;
      },

      destroy: function() {
        // remove event bindings
        this.model.off('currentSlideChanged', this.render_slide);
        // destroy children
        this.currentSlideView.destroy();
        // remove self from DOM
        this.$el.empty();
      }
    });

    return SlideshowView;
  }
);
