var UIObject = require('../UIObject');
var Tile     = require('../basic/Tile');

/**
 * Metro 是一组自定义位置 tile 的组合
 *
 * ```javascript
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
 * ```
 *
 * @class
 * @param options {json} Metro config
 * @constructor
 * @memberof Tivy
 * @extends {Tivy.UIObject}
 */
function Metro(options) {
  if (!options) {
    options = {};
  }
  UIObject.call(this, options);

  this.layout = options.layout;
  if (!this.layout) {
    throw new Error('layout is null');
  }
  this.tiles = [];

  //this.interactive   = true;
  this._currentTile  = null;
  this._currentIndex = 0;

  this.onTileOver    = null;
  this.onTileOut     = null;
  this.onTileClick   = null;
  this.onTileExecute = null;

  this._init();
}


Metro.prototype             = Object.create(UIObject.prototype);
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
      stage: _this.stage,
      owner: _this,
      size: {w: ele.w, h: ele.h},
      position: {x: ele.x, y: ele.y},
      placeHolderTexture: _this.layout.placeHolderTexture,
      radius: ele.radius == null ? _this.layout.radius : ele.radius
    });
    _this.tiles.push(tile);


    tile.on('mouseover', function () {
      _this._currentIndex = i;
      _this._currentTile  = this;
      if (_this.onTileOver) {
        _this.onTileOver(this, i);
      }
    });
    tile.on('mouseout', function () {
      if (_this.onTileOut) {
        _this.onTileOut(this, i);
      }
    });
    tile.on('keydown', function () {
      console.log('keydown');
    });

    tile.on('touchstart', function () {
      console.log('touch start');
      _this._currentIndex = i;
      _this._currentTile  = this;
      if (_this.onTileOver) {
        _this.onTileOver(this, i);
      }
    });
    tile.on('touchend', function (data) {
      //console.log(data.target.text);
      //console.log('leave', i);
      if (_this._currentTile == data.target && _this.onTileExecute) {
        _this.onTileExecute(this, i);
      }
      if (_this.onTileOut) {
        _this.onTileOut(_this._currentTile, _this._currentIndex);
      }
    });

    tile.on('touchcancel', function (data) {
      console.log('touch touchcancel', data);
    });
    //tile.on('touchmove', function (data) {
    //  if (_this._currentTile != data.target && _this.onTileOut) {
    //    _this.onTileOut(_this._currentTile, _this._currentIndex);
    //  }
    //});

    //tile.on('touchend', function () {
    //  console.log(i);
    //  if (_this.onTileOut) {
    //    _this.onTileOut(_this._currentTile, _this._currentIndex);
    //  }
    //  _this._currentIndex = -1;
    //  _this._currentTile  = null;
    //});

    //tile.on('click', function () {
    //  if (_this.onTileClick) {
    //    _this.onTileClick(this, i);
    //  }
    //});
    //tile.on('touchcancel', function () {
    //  if (_this.onTileOut) {
    //    _this.onTileOut(this, i);
    //  }
    //});
  });

};


Metro.prototype.bindData = function (_data) {
  var _this = this;
  _data.forEach(function (ele, i) {
    _this.tiles[i].setContent(ele.imageUrl, ele.text);
  });
};