define(
  [
    'backbone',
    'photic/models/slide-model'
  ],
  function(Backbone, SlideModel) {
    var SlideCollection = Backbone.Collection.extend({
      model: SlideModel,

      comparator: function(slide) { return slide.get('order'); }
    });

    return SlideCollection;
  }
);
