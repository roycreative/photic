define(
  [
    'handlebars',
    'photic/models/photic-model',
    'photic/views/audio-view',
    'photic/views/base-view',
    'photic/views/controls-view',
    'photic/views/slideshow-view',
    'text!photic/templates/photic.html',
    'underscore'
  ],
  function (
    Handlebars,
    PhoticModel,
    AudioView,
    BaseView,
    ControlsView,
    SlideshowView,
    photicTemplate,
    _
  ) {
    var PhoticView = BaseView.extend({

      model: new PhoticModel(),

      initialize: function() {
        _.bindAll(this, 'render', 'title');
        this.model.bind('change', this.render);
        this.model.bind('reset', this.render);
        this.slideshowView = new SlideshowView({model: this.model});
        this.controlsView = new ControlsView({model: this.model});
        this.audioView = new AudioView({model: this.model});
      },

      template: Handlebars.compile(photicTemplate),

      render: function() {
        this.$el.html(this.template(this));
        this.assign({
          '.viewport': this.slideshowView,
          '.controls': this.controlsView,
          '.audio': this.audioView
        });
        return this;
      },

      title: function() {return this.model.get('title');},

      destroy: function() {
        // remove event bindings
        this.model.off('change', this.render);
        this.model.off('reset', this.render);

        // destroy children
        this.slideshowView.destroy();
        this.controlsView.destroy();
        this.audioView.destroy();

        // remove self from DOM
        this.$el.empty();
      }
    });

    return PhoticView;
  }
);
