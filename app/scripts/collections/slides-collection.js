define(
  ['backbone'],
  function(Backbone) {

    var SlidesCollection = Backbone.Collection.extend({

      model: photic.Models.SlideModel

    });

    return SlidesCollection;
  }
);
