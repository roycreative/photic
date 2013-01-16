define(
  [
    'scripts/models/photic-model',
    'text!scripts/templates/photic.html',
    'scripts/views/audio-view',
    'scripts/views/controls-view',
    'scripts/views/slideshow-view',
    'backbone',
    'handlebars',
    'underscore'
  ],
  function (
    PhoticModel,
    photicTemplate,
    AudioView,
    ControlsView,
    SlideshowView
  ) {
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
        // Render SlideshowView
        var slideshowView = new SlideshowView({
          model: this.model,
          el: this.$('.slideshow')
        });
        slideshowView.render();
        // Render ControlsView
        var controlsView = new ControlsView({
          model: this.model,
          el: this.$('.controls')
        });
        controlsView.render();
        // Render AudioView
        var audioView = new AudioView({
          model: this.model,
          el: this.$('.audio')
        });
        audioView.render();
        return this;
      },

      title: function() {return this.model.get('title');}

    });

    return PhoticView;
  }
);
