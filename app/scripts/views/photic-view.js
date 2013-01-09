define(
  [
    'models/photic-model',
    'text!templates/photic.html',
    'views/controls-view',
    'views/slideshow-view',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function (PhoticModel, photicTemplate, ControlsView, SlideshowView) {
    var PhoticView = Backbone.View.extend({

      model: new PhoticModel(),

      initialize: function() {
        _.bindAll(this, 'render', 'title');
        this.model.bind('change', this.render);
        this.model.bind('reset', this.render);
      },

      template: Handlebars.compile(photicTemplate),

      render: function() {
        this.$el.empty();
        this.$el.html(this.template(this));
        var slideshow_view = new SlideshowView({
          model: this.model,
          el: this.$('.slideshow')
        });
        slideshow_view.render();
        var controls_view = new ControlsView({
          model: this.model,
          el: this.$('.controls')
        });
        controls_view.render();
        return this;
      },

      title: function() {return this.model.get('title');}

    });

    return PhoticView;
  }
);
