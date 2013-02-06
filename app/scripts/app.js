define(['photic/routes/photic-router', 'backbone'], function(PhoticRouter) {
  var app = function() {
    router = new PhoticRouter();
    Backbone.history.start();
  };
  return app;
});
