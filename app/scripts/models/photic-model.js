define(
  [
    'scripts/models/slide-collection',
    'scripts/models/slide-model',
    'relational'
  ], function(SlideCollection, SlideModel, Backbone) {
  var PhoticModel = Backbone.RelationalModel.extend({
    initialize: function() {
      _.bindAll(this, 'updateCurrentSlide');
      this.currentSlideIndex = (this.get('slides').length > 0) ? 0 : null;
      this.nextSlideTime = null;
      this.bind('audioTimeUpdate', this.updateCurrentSlide);
    },

    urlRoot: '/photic',

    idAttribute: '_id',

    relations: [{
      type: Backbone.HasMany,
      key: 'slides',
      relatedModel: SlideModel,
      collectionType: SlideCollection,
      reverseRelation: {
        key: 'photic',
        includeInJSON: '_id'
      }
    }],

    getCurrentSlide: function() {
      return this.get('slides').at(this.currentSlideIndex);
    },

    setCurrentSlide: function(model) {
      if (model == null) return;
      this.currentSlideIndex = this.get('slides').indexOf(model);
      this.trigger('currentSlideChanged', model);
    },

    getNextSlide: function() {
      var nextIndex = this.currentSlideIndex + 1;
      if (nextIndex == this.get('slides').length) return null;
      return this.get('slides').at(nextIndex);
    },

    getPreviousSlide: function() {
      var previousIndex = this.currentSlideIndex - 1;
      if (previousIndex < 0) return null;
      return this.get('slides').at(previousIndex);
    },

    updateCurrentSlide: function(currentTime) {
      var nextSlide;
      if (this.nextSlideTime === null) {
        this.nextSlideTime = this.getNextSlide().get('showSec');
      }
      if (currentTime > this.nextSlideTime) {
        this.setCurrentSlide(this.getNextSlide());
        nextSlide = this.getNextSlide();
        if (nextSlide === null) {
          this.nextSlideTime = Number.POSITIVE_INFINITY;
        } else {
          this.nextSlideTime = this.getNextSlide().get('showSec');
        }
      }
    }
  });

  // backbone-relational setup
  PhoticModel.setup();

  return PhoticModel;
});
