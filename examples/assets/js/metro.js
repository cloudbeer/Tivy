$(function () {


  var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');

  var layout = {
    placeHolderTexture: xTexture,
    radius: 20,
    tiles: [
      {
        x: 0, y: 0, w: 200, h: 200,
        showText: false,
        radius: 0
      },
      {
        x: 0, y: 210, w: 200, h: 200,
        showText: false,
        radius: 0
      },
      {
        x: 0, y: 420, w: 200, h: 200,
        showText: false,
        radius: 0
      },
      {
        x: 210, y: 0, w: 400, h: 620,
        showText: false
      },
      {
        x: 620, y: 0, w: 500, h: 305,
        showText: false,
        radius: 0
      },
      {
        x: 620, y: 315, w: 500, h: 305,
        showText: false,
        radius: 0
      },
      {
        x: 1130, y: 0, w: 410, h: 410,
        showText: false,
        radius: 10
      },
      {
        x: 1130, y: 420, w: 200, h: 200,
        showText: false,
        radius: 10
      },
      {
        x: 1340, y: 420, w: 200, h: 200,
        showText: false,
        radius: 10
      },
      {
        x: 1550, y: 0, w: 500, h: 305,
        showText: false,
        radius: 10
      },
      {
        x: 1550, y: 315, w: 500, h: 305,
        showText: false,
        radius: 10
      },
      {
        x: 2060, y: 0, w: 410, h: 410,
        showText: false,
        radius: 10
      },
      {
        x: 2060, y: 420, w: 200, h: 200,
        showText: false,
        radius: 10
      },
      {
        x: 2270, y: 420, w: 200, h: 200,
        showText: false,
        radius: 10
      }
    ]
  };
  var data   = [
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正0'
    },
    {
      imageUrl: './assets/img/200X200.jpg',
      text: '小正1'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正2'
    },
    {
      imageUrl: './assets/img/400X620-1.jpeg',
      text: '大长3'
    },
    {
      imageUrl: './assets/img/500X305-1.jpg',
      text: '中横4'
    },
    {
      imageUrl: './assets/img/500X305-2.jpg',
      text: '中横5'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正6'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正7'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正8'
    },
    {
      imageUrl: './assets/img/500X305-1.jpg',
      text: '中横9'
    },
    {
      imageUrl: './assets/img/500X305-2.jpg',
      text: '中横10'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正11'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正12'
    },
    {
      imageUrl: './assets/img/200X200-1.jpg',
      text: '小正13'
    },

  ];


  var stage = new Tivy.Stage({
    background: '#000',
    id: 'stage01',
    //size: {w: $(document.body).width(), h: $(document.body).height()}
    size: {w: 1920, h: 1080}
  });

  xTexture.baseTexture.on('loaded', function () {
    var metro = new Tivy.Metro({
      position: {x: 100, y: 200},
      stage: stage,
      layout: layout
    });

    metro.bindData(data);

    //metro.on('click', function (data) {
    //  console.log(this.currentTile, this.currentIndex);
    //});

    metro.onTileOver = function (target, index) {
      var oriH     = target.height,
          oriW     = target.width;
      target.scale = {x: 1.2, y: 1.2};
      target.x     = target.x + (oriW - target.width) / 2;
      target.y     = target.y + (oriH - target.height) / 2;
      target.bringToFront();
      stage.repaint();
    };

    metro.onTileOut = function (target, index) {
      var oriH     = target.height,
          oriW     = target.width;
      target.scale = {x: 1, y: 1};
      target.x     = target.x + (oriW - target.width) / 2;
      target.y     = target.y + (oriH - target.height) / 2;
      target.sendToBack();
      stage.repaint();
    };

    metro.onTileExecute = function (target, index) {
      console.log('execute', target.text);
    }

  });

  window.stage = stage;

});