define(['relational'], function() {
  var SlideModel = Backbone.RelationalModel.extend({
    urlRoot: '/slides'
  });

  // backbone-relational setup
  SlideModel.setup();

  return SlideModel;
});

