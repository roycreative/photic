define(
  ['views/photic-view', 'models/photic-model', 'relational'],
  function(PhoticView, PhoticModel) {

    var PhoticRouter = Backbone.Router.extend({

      routes: {
        "photic/:_id": "show_photic"
      },

      show_photic: function(_id) {
        var photicModel = PhoticModel.findOrCreate({_id: _id});
        var view = new PhoticView({
          model: photicModel,
          el: $('#photic')
        });
        photicModel.fetch({
          success: function (model, resp, options) {
            photicModel.setCurrentSlide(model.get('slides').at(0));
          }
        });
      }

    });

    return PhoticRouter;
  }
);
