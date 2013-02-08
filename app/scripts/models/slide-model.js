define(['relational'], function() {
  var SlideModel = Backbone.RelationalModel.extend({
    urlRoot: '/slide'
  });

  // backbone-relational setup
  SlideModel.setup();

  return SlideModel;
});

