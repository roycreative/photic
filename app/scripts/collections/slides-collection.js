define(
  ['backbone', 'models/slide-model'],
  function(Backbone, SlideModel) {

    var SlidesCollection = Backbone.Collection.extend({

      model: SlideModel,

      // TODO: Need to refine model hierarchy
      // Read this article about Backbone-relational:
      // http://antoviaque.org/docs/tutorials/backbone-relational-tutorial/ 
      // Thinking that there may be a Photic Model that points to single resource
      // (.../photic/1/) which contains a single resource
      url: '/slides',

      initialize: function(models) {
        models = models || [];
        this.currentSlideIndex = (models.length > 0) ? 0 : null;
      },

      getCurrentSlide: function() {
        return this.at(this.currentSlideIndex);
      },

      setCurrentSlide: function(model) {
        this.currentSlideIndex = this.indexOf(model);
        this.trigger('currentSlideChanged', model);
      },

      getNextSlide: function() {
        var nextIndex = this.currentSlideIndex + 1;
        if (nextIndex == this.length) nextIndex = 0;
        return this.at(nextIndex);
      },

      getPreviousSlide: function() {
        var previousIndex = this.currentSlideIndex - 1;
        if (previousIndex < 0) previousIndex = (this.length - 1);
        return this.at(previousIndex);
      }

    });

    return SlidesCollection;
  }
);
