define(
  [
    'photic/models/slide-collection',
    'photic/models/slide-model',
    'relational',
    'underscore'
  ], function(SlideCollection, SlideModel, Backbone, _) {
  var PhoticModel = Backbone.RelationalModel.extend({
    initialize: function() {
      _.bindAll(
        this,
        'seekCurrentSlide',
        'updateCurrentSlide'
      );
      this.currentSlideIndex = (this.get('slides').length > 0) ? 0 : null;
      this.nextSlideTime = null;
      this.bind('audioTimeUpdate', this.updateCurrentSlide);
      this.bind('audioSeeked', this.seekCurrentSlide);
    },

    urlRoot: '/photic',

    relations: [{
      type: Backbone.HasMany,
      key: 'slides',
      relatedModel: SlideModel,
      collectionType: SlideCollection,
      reverseRelation: {
        key: 'photic'
      }
    }],

    getCurrentSlide: function() {
      return this.get('slides').at(this.currentSlideIndex);
    },

    setCurrentSlide: function(model) {
      if (model === null) return;
      this.currentSlideIndex = this.get('slides').indexOf(model);
      this.setNextSlideTime();
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

    setNextSlideTime: function(time) {
      var nextSlide;
      if (time !== undefined) {
        this.nextSlideTime = time;
        return;
      }
      nextSlide = this.getNextSlide();
      if (nextSlide === null) {
        this.nextSlideTime = Number.POSITIVE_INFINITY;
      } else {
        this.nextSlideTime = nextSlide.get('displayTime');
      }
    },

    updateCurrentSlide: function(currentTime) {
      if (this.nextSlideTime === null) {
        this.nextSlideTime = this.getNextSlide().get('displayTime');
      }
      if (currentTime > this.nextSlideTime) {
        this.setCurrentSlide(this.getNextSlide());
      }
    },

    seekCurrentSlide: function(currentTime) {
      var newCurrentSlide = _.min(
        this.get('slides').models,
        function (slide) {
          var check = currentTime - slide.get('displayTime');
          if (check >= 0) {
            return check;
          } else {
            return Number.POSITIVE_INFINITY;
          }
        }
      );
      this.setCurrentSlide(newCurrentSlide);
    }
  });

  // backbone-relational setup
  PhoticModel.setup();

  return PhoticModel;
});
