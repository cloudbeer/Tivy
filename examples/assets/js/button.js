$(function () {

  var stage = new Tivy.Stage({
    size: {width: 600, height: 600},
    background: '#373435',
    id: 'buttonSample',
  });

  var button = new Tivy.Button({
    stage: stage,
    textureDefault: PIXI.Texture.fromImage('./assets/img/d.png'),
    textureDown: PIXI.Texture.fromImage('./assets/img/d1.png'),
    position: {x: 100, y: 100},
    size: {width: 200, height: 50}
  });

  button.on('click', function () {
    console.log('I am clicked');
  });
  //button.setImgView({default: "./assets/img/d.png", mousedown: "./assets/img/d1.png"}).setDefaultTexture();
  //stage.addChild(button);
  //window.stage = stage;
});