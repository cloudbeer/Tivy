var UIObjectGroup = require('../UIObjectGroup');
var Tile          = require('../basic/Tile');

/**
 * Metro 是一组自定义位置 tile 的组合
 *
 * @example
 var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');

 var layout = {
    placeHolderTexture: xTexture,
    radius: 20,
    tiles: [
      {
        x: 0, y: 0, width: 200, height: 200,
        showText: false,
        radius: 0
      },
      {
        x: 0, y: 210, width: 200, height: 200,
        showText: false,
        radius: 0
      },
      {
        x: 0, y: 420, width: 200, height: 200,
        showText: false,
        radius: 0
      },
      {
        x: 210, y: 0, width: 400, height: 620,
        showText: false
      },
      {
        x: 620, y: 0, width: 500, height: 305,
        showText: false,
        radius: 0
      },
      {
        x: 620, y: 315, width: 500, height: 305,
        showText: false,
        radius: 0
      },
      {
        x: 1130, y: 0, width: 410, height: 410,
        showText: false,
        radius: 10
      },
      {
        x: 1130, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      },
      {
        x: 1340, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      },
      {
        x: 1550, y: 0, width: 500, height: 305,
        showText: false,
        radius: 10
      },
      {
        x: 1550, y: 315, width: 500, height: 305,
        showText: false,
        radius: 10
      },
      {
        x: 2060, y: 0, width: 410, height: 410,
        showText: false,
        radius: 10
      },
      {
        x: 2060, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      },
      {
        x: 2270, y: 420, width: 200, height: 200,
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
    //size: {width: $(document.body).width(), height: $(document.body).height()}
    size: {width: 1920, height: 1080}
  });

 xTexture.baseTexture.on('loaded', function () {
    var metro = new Tivy.Metro({
      position: {x: 100, y: 200},
      stage: stage,
      layout: layout
    });

    metro.bindData(data);


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

 *
 *
 *
 * @class
 * @param options {json} Metro config
 * @constructor
 * @memberof Tivy
 * @extends {Tivy.UIObjectGroup}
 */
function Metro(options) {
  if (!options) {
    options = {};
  }
  UIObjectGroup.call(this, options);

  this.layout = options.layout;
  if (!this.layout) {
    throw new Error('layout is null');
  }
  this._init();

}


Metro.prototype             = Object.create(UIObjectGroup.prototype);
Metro.prototype.constructor = Metro;
module.exports              = Metro;


/**
 * 初始化
 *
 * @private
 */
Metro.prototype._init = function () {
  //Draw layout
  var _this = this;
  this.layout.tiles.forEach(function (ele, i) {
    var tile = new Tile({
      stage             : _this.stage,
      owner             : _this.container,
      size              : {width: ele.width, height: ele.height},
      position          : {x: ele.x, y: ele.y},
      placeHolderTexture: _this.layout.placeHolderTexture,
      radius            : ele.radius == null ? _this.layout.radius : ele.radius,
      data              : ele.data
    });
    _this.attachEvent(tile);
  });

};

/**
 * 绑定数据
 *
 * @param newData {json} 绑定的数据, 格式如下:
 * @example
 *  [{
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正0',
   data: 'anything'
 },
 {
   imageUrl: './assets/img/200X200.jpg',
   text: '小正1',
   data: 'anything'
 }]
 *
 */
Metro.prototype.bindData = function (newData) {
  var _this = this;
  newData.forEach(function (ele, i) {
    _this.controls[i].setContent(ele.imageUrl, ele.text, ele.data);
  });
};