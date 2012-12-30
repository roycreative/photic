define(
  ['exports', 'backbone', 'handlebars', 'text!templates/photic.html'],
  function (photic, Backbone, Handlebars, photicTemplate) {
    photic.View = Backbone.View.extend({
      el: '#slideshow',
      render: function() {
        var self = this;
        var template = Handlebars.compile(photicTemplate);
        console.log(photicTemplate);
        console.log(template);
        self.$el.html(template({testing: "Hello from handlebar template."}));
        return this;
      }
    });
  }
);
