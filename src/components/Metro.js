var UIObject = require('../UIObject');
var Tile     = require('../basic/Tile');

/**
 * Metro 是一组自定义位置 tile 的组合
 *
 * @class
 * @param options
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