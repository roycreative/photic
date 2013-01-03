define(
  [
    'collections/slides-collection',
    'text!templates/photic.html',
    'backbone',
    'handlebars'
  ],
  function (SlidesCollection, photicTemplate) {
    var PhoticView = Backbone.View.extend({

      el: '#photic',

      initialize: function() {
        this.slides = new SlidesCollection();
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
