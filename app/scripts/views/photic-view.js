define(
  ['backbone', 'handlebars', 'text!templates/photic.html'],
  function (Backbone, Handlebars, photicTemplate) {

    var PhoticView = Backbone.View.extend({

      el: '#photic',

      render: function() {
        var template = Handlebars.compile(photicTemplate);
        this.$el.empty();
        this.$el.html(template({testing: "Hello from handlebar template."}));
        return this;
      }
    });

    return PhoticView;
  }
);
