$(function () {


  var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');

  var layout = {
    placeHolderTexture: xTexture,
    radius            : 15,
    tiles             : [
      {
        x       : 0,
        y       : 0,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 0
      },
      {
        x       : 0,
        y       : 210,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 0
      },
      {
        x       : 0,
        y       : 420,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 0
      },
      {
        x       : 210,
        y       : 0,
        width   : 400,
        height  : 620,
        showText: false
      },
      {
        x       : 620,
        y       : 0,
        width   : 500,
        height  : 305,
        showText: false,
        radius  : 0
      },
      {
        x       : 620,
        y       : 315,
        width   : 500,
        height  : 305,
        showText: false,
        radius  : 0
      },
      {
        x       : 1130,
        y       : 0,
        width   : 410,
        height  : 410,
        showText: false,
        radius  : 10
      },
      {
        x       : 1130,
        y       : 420,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 10
      },
      {
        x       : 1340,
        y       : 420,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 10
      },
      {
        x       : 1550,
        y       : 0,
        width   : 500,
        height  : 305,
        showText: false,
        radius  : 10
      },
      {
        x       : 1550,
        y       : 315,
        width   : 500,
        height  : 305,
        showText: false,
        radius  : 10
      },
      {
        x       : 2060,
        y       : 0,
        width   : 410,
        height  : 410,
        showText: false,
        radius  : 10
      },
      {
        x       : 2060,
        y       : 420,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 10
      },
      {
        x       : 2270,
        y       : 420,
        width   : 200,
        height  : 200,
        showText: false,
        radius  : 10
      }
    ]
  };
  var data   = [
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正0'
    },
    {
      imageUrl: './assets/img/200X200.jpg',
      text    : '小正1'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正2'
    },
    {
      imageUrl: './assets/img/400X620-1.jpeg',
      text    : '大长3'
    },
    {
      imageUrl: './assets/img/500X305-1.jpg',
      text    : '中横4'
    },
    {
      imageUrl: './assets/img/500X305-2.jpg',
      text    : '中横5'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正6'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正7'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正8'
    },
    {
      imageUrl: './assets/img/500X305-1.jpg',
      text    : '中横9'
    },
    {
      imageUrl: './assets/img/500X305-2.jpg',
      text    : '中横10'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正11'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正12'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text    : '小正13'
    },

  ];


  var stage = new Tivy.Stage({
    background: '#000',
    id        : 'stage01',
    //size: {width: $(document.body).width(), height: $(document.body).height()}
    size      : {width: 1920, height: 1080}
  });

  xTexture.baseTexture.on('loaded', function () {


    var metro = new Tivy.Metro({
      position: {x: 100, y: 200},
      stage   : stage,
      layout  : layout
    });


    var frame = new Tivy.ImageFrame({
      stage       : stage,
      imageUrl    : './assets/img/frame.png',
      position    : {x: 100, y: 100},
      size        : {
        width: 50, height: 50,
      },
      borderLength: 61,
      radius      : 15,
      imageLength : 130
    });


    metro.bindData(data);


    //加入动画
    var manager = new Tivy.AnimalManager({
      stage   : stage,
      duration: 300,
      fps     : 30
    });
    manager.runAnimals();


    //metro.on('focus', function (target, index) {
    //  var oriH     = target.height,
    //      oriW     = target.width;
    //  target.scale = {x: 1.2, y: 1.2};
    //  target.x     = target.x + (oriW - target.width) / 2;
    //  target.y     = target.y + (oriH - target.height) / 2;
    //  target.bringToFront();
    //  frame.setPosition(target.getGlobalPosition());
    //  frame.setSize({width: target.width, height: target.height});
    //  stage.repaint();
    //});
    //
    //metro.on('leave', function (target, index) {
    //  var oriH     = target.height,
    //      oriW     = target.width;
    //  target.scale = {x: 1, y: 1};
    //  target.x     = target.x + (oriW - target.width) / 2;
    //  target.y     = target.y + (oriH - target.height) / 2;
    //  frame.setPosition(target.getGlobalPosition());
    //  frame.setSize({width: target.width, height: target.height});
    //  target.sendToBack();
    //  stage.repaint();
    //});

    metro.on('execute', function (target, index) {
      console.log('execute', target.text, index);
    });


    //metro.accessible = true;
    //metro.on('keyup', function (a) {
    //  console.log('keyup', a);
    //});
    metro.on('change', function (target, i1, target2, i2) {
      var oriH     = target.height,
          oriW     = target.width;
      target.scale = {x: 1.2, y: 1.2};
      target.x     = target.x + (oriW - target.width) / 2;
      target.y     = target.y + (oriH - target.height) / 2;
      target.bringToFront();

      stage.repaint();

      var tarGlobalPos = target.getGlobalPosition();
      var rightDelta   = tarGlobalPos.x + target.width - stage.width;
      if (rightDelta > 0) {
        this.container.x -= rightDelta + 50;
      }
      var leftDelta = tarGlobalPos.x;
      if (leftDelta < 50) {
        this.container.x += target.width + 10;
        if (this.container.x > 0) {
          this.container.x = 0;
        }
      }
      stage.repaint();
      //console.log(tarGlobalPos.x, target.width, stage.width);

      //frame.setPosition(target.getGlobalPosition());

      //console.log(frame.position, target.getGlobalPosition());
      manager.addAnimal({
        target  : frame,
        property: 'x',
        to      : target.getGlobalPosition().x,
        easing  : Tivy.CONST.EASINGS.easeInQuint
      });
      manager.addAnimal({
        target  : frame,
        property: 'y',
        to      : target.getGlobalPosition().y,
        easing  : Tivy.CONST.EASINGS.easeOutQuint
      });
      manager.addAnimal({
        target  : frame,
        property: 'frameWidth',
        to      : target.width,
        easing  : Tivy.CONST.EASINGS.easeInQuint
      });
      manager.addAnimal({
        target  : frame,
        property: 'frameHeight',
        to      : target.height,
        easing  : Tivy.CONST.EASINGS.easeInQuint
      });
      //manager.addTarget(frame, 'x', target.getGlobalPosition().x);
      //manager.addTarget(frame, 'y', target.getGlobalPosition().y);
      //manager.addTarget(frame, 'frameWidth', target.width);
      //manager.addTarget(frame, 'frameHeight', target.height);

      //frame.setSize({width: target.width, height: target.height});


      if (target2) {
        oriH          = target2.height;
        oriW          = target2.width;
        target2.scale = {x: 1, y: 1};
        target2.x     = target2.x + (oriW - target2.width) / 2;
        target2.y     = target2.y + (oriH - target2.height) / 2;
        target2.sendToBack();
      }

      stage.repaint();

    });


    metro.activate();

    window.metro = metro;


  });

  window.stage = stage;

});