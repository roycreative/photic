define(['relational'], function() {
  var SlideModel = Backbone.RelationalModel.extend({
    idAttribute: '_id',

    urlRoot: '/slides'
  });

  // backbone-relational setup
  SlideModel.setup();

  return SlideModel;
});

