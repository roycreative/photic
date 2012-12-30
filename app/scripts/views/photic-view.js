define(
  ['backbone', 'handlebars', 'text!templates/photic.html'],
  function (Backbone, Handlebars, photicTemplate) {
    var PhoticView = Backbone.View.extend({
      el: '#slideshow',
      render: function() {
        var self = this;
        var template = Handlebars.compile(photicTemplate);
        self.$el.html(template({testing: "Hello from handlebar template."}));
        return this;
      }
    });
    return PhoticView;
  }
);
