define(
  [
    'models/photic-model',
    'text!templates/photic.html',
    'backbone',
    'handlebars'
  ],
  function (PhoticModel, photicTemplate) {
    var PhoticView = Backbone.View.extend({

      el: '#photic',

      initialize: function() {
        this.photic = new PhoticModel();
      },

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
