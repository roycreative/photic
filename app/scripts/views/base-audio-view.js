define(['scripts/views/base-view', 'underscore'], function(BaseView, _) {
  var BaseAudioView = BaseView.extend({
      audio: _.memoize(function() {
        return document.getElementById('audio');
      })
  });

  return BaseAudioView;
});

