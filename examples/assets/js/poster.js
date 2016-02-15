$(function () {

  var stage = new Tivy.Stage({
    background: '#000',
    id: 'buttonSample'
  });


  var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');
  xTexture.baseTexture.on('loaded', function () {
    var poster = new Tivy.Poster({
      size: {w: 192, h: 338},
      stage: stage,
      isWithText: true,
      text: "中文",
      position: {x: 30, y: 30},
      placeHolderTexture: xTexture,
      textBgColor: 0x006600,
      textColor:0xffffff,
      imageUrl:'./assets/img/test.png'
    });

    //poster.setContent('./assets/img/test.png', '长发公主');

    window.poster = poster;
  });

  window.stage  = stage;

});