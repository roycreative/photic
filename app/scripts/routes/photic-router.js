define(
  [
    'photic/views/photic-view',
    'photic/models/photic-model',
    'relational',
    'jquery'
  ], function(PhoticView, PhoticModel) {

    var PhoticRouter = Backbone.Router.extend({

      routes: {
        "photic/:_id": "show_photic"
      },

      show_photic: function(_id) {
        var photicModel = PhoticModel.findOrCreate({id: _id});
        new PhoticView({
          model: photicModel,
          el: $('.photicPlayer')
        });
        photicModel.fetch({
          success: function (model) {
            model.fetchRelated('slides', {
              success: function() {
                photicModel.setCurrentSlide(photicModel.get('slides').at(0));
              },
              error: function (model, xhr) {
                console.log(model);
                console.log(xhr);
              }
            });
          },
          error: function (model, xhr) {
            console.log(model);
            console.log(xhr);
          }
        });
      }

    });

    return PhoticRouter;
  }
);
