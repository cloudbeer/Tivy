$(function () {

  var stage = new Tivy.Stage({
    background: '#000',
    id: 'stage01',
    size: {w: $(document.body).width(), h: $(document.body).height()}
  });


  var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');
  xTexture.baseTexture.on('loaded', function () {
    var poster = new Tivy.Poster({
      size: {w: 200, h: 200},
      stage: stage,
      showText: true,
      text: "中文",
      position: {x: 30, y: 30},
      placeHolderTexture: xTexture,
      textBgColor: 0x006600,
      textColor: 0xffffff,
      radius: 15
      //imageUrl:'./assets/img/test.png'
    });

    var poster2 = new Tivy.Poster({
      size: {w: 200, h: 200},
      stage: stage,
      showText: true,
      text: "中文",
      position: {x: 240, y: 30},
      placeHolderTexture: xTexture,
      textBgColor: 0x006600,
      textColor: 0xffffff,
      radius: 14,
      imageUrl: './assets/img/test.png'
    });

    poster.setContent('./assets/img/test.png', '长发公主');

    window.setTimeout(function () {
      poster.destroy();
    }, 10000);

    window.poster = poster;

    function debug(msg) {
      $('#debug').val($('#debug').val() + msg + "\n");
    }

    //
    poster2.interactive = true;


    poster.mousedown   = function (data) {
      console.log(1);
    };
    poster2.touchstart = function (data) {
      debug("touch start");
    };
    poster2.touchend   = function (data) {
      debug("touch end");
    };
    poster2.mousedown  = function (data) {
      debug("mouse down");

    };
    poster2.touchmove  = function (data) {
      debug("touch move");
    };
    //poster2.onMouseDown = function (data) {
    //  console.log(data);
    //};
  });

  window.stage = stage;

});