$(function () {

  var stage = new Tivy.Stage({
    background: '#000',
    id        : 'stage01',
    size      : {width: $(document.body).width(), height: $(document.body).height()}
  });


  var tile = new Tivy.Tile({
    size       : {width: 200, height: 300},
    stage      : stage,
    showText   : true,
    text       : "中文",
    position   : {x: 30, y: 400},
    //placeHolderTexture: xTexture,
    textBgColor: 0x006600,
    textColor  : 0xffffff,
    radius     : 0,
    imageUrl   : './assets/img/test.png'
  });


  window.tile = tile;

  window.stage = stage;

  var manager = new Tivy.AnimalManager({
    stage   : stage,
    duration: 5000,
    fps     : 60
  });
  manager.addAnimal({
    target  : tile,
    property: 'x',
    from    : 0,
    to      : 2000,
    easing  : Tivy.CONST.EASINGS.linear
  });
  manager.addAnimal({
    target  : tile,
    property: 'y',
    from    : 0,
    to      : 2000,
    easing  : Tivy.CONST.EASINGS.easeOutBounce
  });
  manager.runAnimals();
});