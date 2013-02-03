define(
  [
    'backbone',
    'scripts/models/slide-model'
  ],
  function(Backbone, SlideModel) {
    var SlideCollection = Backbone.Collection.extend({
      model: SlideModel,

      url: function(models) {
        return '/slides/' + (
          models ? 'set/' + _.pluck(models, 'id').join(';') + '/' : '');
      },

      comparator: function(slide) { return slide.get('order'); }
    });

    return SlideCollection;
  }
);
