define(['scripts/views/base-view'], function(BaseView) {
  var BaseAudioView = BaseView.extend({
      audio: function() { return document.getElementById('audio'); }
  });

  return BaseAudioView;
});

