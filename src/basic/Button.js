var UIObject = require('../UIObject');

/**
 * 这是一个按钮, 默认开启了事件支持.
 * 支持如下事件:
 * mousedown mouseup mouseover mouseupoutside mouseout click
 * touchstart touchend, touchmove touchendoutside
 *
 * @class
 * @param options  {json} 配置节点
 * ```json
 * {
 *  stage: stage01, //Instance of Stage
 *  size: {w: 300, h: 400},
 *  position: {x: 0, y: 0},
 *  textureDefault: textureDefault, //required.
 *  textureDown: textureDown,
 * }
 * ```
 * @constructor
 * @memberof Tivy
 * @extends Tivy.UIObject
 */
function Button(options) {
  if (!options) {
    options = {};
  }
  UIObject.call(this, options);
  this.textureDefault = options.textureDefault;
  if (!this.textureDefault) {
    throw new Error('textureDefault is required.');
  }
  this.textureDown = options.textureDown;

  this.btnSprite   = null;
  this.interactive = true;
  this._paint(this.textureDefault);

  var _this = this;
  if (this.textureDown) {
    var onPressDown = function () {
      _this._paint(_this.textureDown);
    };
    var onPressUp   = function () {
      _this._paint(_this.textureDefault);
    };
    this.on('mousedown', onPressDown);
    this.on('mouseup', onPressUp);
    this.on('touchstart', onPressDown);
    this.on('touchend', onPressUp);
  }
}

Button.prototype             = Object.create(UIObject.prototype);
Button.prototype.constructor = Button;
module.exports               = Button;

Button.prototype._paint = function (_texture) {
  if (this.btnSprite) {
    this.btnSprite.texture = _texture;
  } else {
    this.btnSprite = new PIXI.Sprite(_texture);
    this.addChild(this.btnSprite);

  }
  var _stage = this.stage;
  _texture.baseTexture.on('loaded', function () {
    _stage.repaint();
  });
  _stage.repaint();
};

