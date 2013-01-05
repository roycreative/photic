define(
  ['backbone', 'views/photic-view'],
  function(Backbone, PhoticView) {

    var PhoticRouter = Backbone.Router.extend({

      routes: {
        "": "index"
      },

      index: function() {
        var view = new PhoticView();
        view.render();
      }

    });

    return PhoticRouter;
  }
);
