$(function () {

  var stage = new Tivy.Stage({
    size: {w: 600, h: 600},
    background: '#ccc',
    id: 'buttonSample',
  });

  var button = new Tivy.Button({
    stage: stage,
    textureDefault: PIXI.Texture.fromImage('./assets/img/d.png'),
    textureDown: PIXI.Texture.fromImage('./assets/img/d1.png'),
    position: {x: 100, y: 100}
  });

  button.on('mousedown', function(){
    console.log('I am clicked');
  });
  //button.setImgView({default: "./assets/img/d.png", mousedown: "./assets/img/d1.png"}).setDefaultTexture();
  //stage.addChild(button);
  //window.stage = stage;
});