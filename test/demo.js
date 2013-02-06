require(['common'], function() {
  require(
    [
      'photic/models/photic-model',
      'photic/views/photic-view',
      'text!resources/photic.json'
    ], function(PhoticModel, PhoticView, photicData) {
      var photicJson = JSON.parse(photicData),
        photicModel = new PhoticModel(photicJson),
        photicView = new PhoticView({
            el: $('#photic'),
            model: photicModel
          });
        photicView.render();
        photicModel.setCurrentSlide(photicModel.get('slides').at(0));
  });
});
