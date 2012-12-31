define(
  ['backbone', 'views/photic-view'],
  function(Backbone, PhoticView) {

    var PhoticRouter = Backbone.Router.extend({

      initialize: function(opt) {
        this.el = opt.el;
      },

      routes: {
        "": "index"
      },

      index: function() {
        var view = new PhoticView();
        this.el.empty();
        this.el.append(view.render({el: this.el}))
      }

    });

    return PhoticRouter;
  }
);
