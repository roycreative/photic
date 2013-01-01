define(
  ['backbone', 'models/slide-model'],
  function(Backbone, SlideModel) {

    var SlidesCollection = Backbone.Collection.extend({

      model: SlideModel

    });

    return SlidesCollection;
  }
);
