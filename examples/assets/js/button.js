$(function () {

  var stage = new Tivy.Stage({
    size: {w: 600, h: 600},
    background: '#ccc',
    id: 'buttonSample'
  });




  var texture = PIXI.Texture.fromImage('./assets/img/test.png');
  var sprite  = new PIXI.Sprite(texture);
  stage.addChild(sprite);

  texture.baseTexture.on('loaded', function () {
    stage.repaint();
  });

  window.stage = stage;

});