define(['models/slide-model', 'relational'], function(SlideModel) {
  var PhoticModel = Backbone.RelationalModel.extend({

    initialize: function() {
      this.currentSlideIndex = (this.get('slides').length > 0) ? 0 : null;
    },

    urlRoot: '/photic',

    idAttribute: '_id',

    relations: [{
      type: Backbone.HasMany,
      key: 'slides',
      relatedModel: SlideModel,
      reverseRelation: {
        key: 'photic',
        includeInJSON: '_id'
      }
    }],

    getCurrentSlide: function() {
      return this.get('slides').at(this.currentSlideIndex);
    },

    setCurrentSlide: function(model) {
      this.currentSlideIndex = this.get('slides').indexOf(model);
      this.trigger('currentSlideChanged', model);
    },

    getNextSlide: function() {
      var nextIndex = this.currentSlideIndex + 1;
      if (nextIndex == this.get('slides').length) nextIndex = 0;
      return this.get('slides').at(nextIndex);
    },

    getPreviousSlide: function() {
      var previousIndex = this.currentSlideIndex - 1;
      if (previousIndex < 0) previousIndex = (this.get('slides').length - 1);
      return this.get('slides').at(previousIndex);
    }

  });

  // backbone-relational setup
  PhoticModel.setup();

  return PhoticModel;
});
