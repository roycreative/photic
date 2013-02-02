define(['backbone'], function(Backbone) {
  var BaseView = Backbone.View.extend({
    /** Call Backbone's setElement when rendering subviews */
    assign: function(selector, view) {
      var selectors;
      if (_.isObject(selector)) {
          selectors = selector;
      }
      else {
          selectors = {};
          selectors[selector] = view;
      }
      if (!selectors) return;
      _.each(selectors, function (view, selector) {
          view.setElement(this.$(selector)).render();
      }, this);
    },

    destroy: function() {return undefined;}
  });

  return BaseView;
});

