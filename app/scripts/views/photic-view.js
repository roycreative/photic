define(
  [
    'scripts/models/photic-model',
    'scripts/views/audio-view',
    'scripts/views/controls-view',
    'scripts/views/slideshow-view',
    'text!scripts/templates/photic.html',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function (
    PhoticModel,
    AudioView,
    ControlsView,
    SlideshowView,
    photicTemplate
  ) {
    var PhoticView = Backbone.View.extend({

      model: new PhoticModel(),

      initialize: function() {
        _.bindAll(this, 'render', 'title');
        this.model.bind('change', this.render);
        this.model.bind('reset', this.render);
        this.slideshowView = {destroy: function() {}};
        this.controlsView = {destroy: function() {}};
        this.audioView = {destroy: function() {}};
      },

      template: Handlebars.compile(photicTemplate),

      render: function() {
        this.$el.empty();
        this.$el.html(this.template(this));
        // Render SlideshowView
        this.slideshowView = new SlideshowView({
          model: this.model,
          el: this.$('.slideshow')
        });
        this.slideshowView.render();
        // Render ControlsView
        this.controlsView = new ControlsView({
          model: this.model,
          el: this.$('.controls')
        });
        this.controlsView.render();
        // Render AudioView
        this.audioView = new AudioView({
          model: this.model,
          el: this.$('.audio')
        });
        this.audioView.render();
        return this;
      },

      title: function() {return this.model.get('title');},

      destroy: function() {
        // destroy children
        this.slideshowView.destroy();
        this.controlsView.destroy();
        this.audioView.destroy();

        // remove event bindings
        this.model.off('change', this.render);
        this.model.off('reset', this.render);

        // remove self from DOM
        this.$el.empty();
      }
    });

    return PhoticView;
  }
);
