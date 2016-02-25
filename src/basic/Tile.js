var UIObject = require('../UIObject');
/**
 * 广告招贴
 *
 *
 * @example
 *
 var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');
 xTexture.baseTexture.on('loaded', function () {
    var tile = new Tivy.Tile({
      size: {width: 192, height: 338},
      stage: stage,
      showText: true,
      text: "中文",
      position: {x: 30, y: 30},
      placeHolderTexture: xTexture,
      textBgColor: 0x006600,
      textColor:0xffffff,
      //imageUrl:'./assets/img/test.png'
    });

    poster.setContent('./assets/img/test.png', '长发公主');

    window.setTimeout(function () {
      poster.destroy();
    }, 10000);
  });

 *
 * @class
 * @memberof Tivy
 * @extends Tivy.UIObject
 * @param {json} options - 配置节点
 * @param {{width: number, height: number}} options.size={width:300,height:400}  - 尺寸
 * @param {PIXI.Texture} options.placeHolderTexture  - 素材贴图, 为了占位
 * @param {boolean} options.showText=false - 是否显示文字
 * @param {string} options.text - 要显示的文字
 * @param {number|string} options.textColor=0x7f7f7f - 文字颜色
 * @param {number|string} options.textBgColor=0xffffff - 文字背景颜色
 * @param {number} options.textHeight=50 - 文字区块的高度
 * @param {string} options.font - 字体, 如 '25px 迷你简准圆'
 * @param {string} options.imageUrl - 图片地址
 * @param {number} options.radius=0 - 瓷片的圆角
 *
 */
function Tile(options) {
  if (!options) {
    options = {};
  }
  this.size = options.size = options.size || {width: 300, height: 400};
  UIObject.call(this, options);

  this.placeHolderTexture = options.placeHolderTexture;
  //if (!this.placeHolderTexture) {
  //  throw new Error('placeHolderTexture is null');
  //}

  this.showText      = options.showText || false;
  this.text          = options.text;
  this.textColor     = options.textColor || 0x7f7f7f;
  this.textBgColor   = options.textBgColor || 0xffffff;
  this.textHeight    = options.textHeight || 50;
  this.font          = options.font || '25px 迷你简准圆';
  this.imageUrl      = options.imageUrl;
  this.radius        = options.radius || 0;
  this.posterTexture = null;
  this.imageSprite   = null;
  this.textLabel     = null;
  this.posterSetted  = false;
  this.interactive   = true;
  this.data          = null;
  this.myIndex       = options.myIndex || 0;

  this._init();
}

Tile.prototype             = Object.create(UIObject.prototype);
Tile.prototype.constructor = Tile;
module.exports             = Tile;

/**
 * 初始化
 *
 * @private
 */
Tile.prototype._init = function () {
  if (this.radius) {
    var mask = new PIXI.Graphics();
    mask.lineStyle(0);
    mask.beginFill(0xffffff);
    mask.drawRoundedRect(0, 0, this.size.width, this.size.height, this.radius);
    mask.endFill();
    this.addChild(mask);
    this.mask = mask;
  }

  //背景
  var g = new PIXI.Graphics();
  g.lineStyle(0);
  g.beginFill(this.textBgColor, .5);
  if (this.showText && this.text) {
    g.drawRect(0, 0, this.size.width, this.size.height - this.textHeight);

    //文字背景
    g.beginFill(this.textBgColor, .7);
    g.drawRect(0, this.size.height - 50, this.size.width, this.textHeight);

    this.textLabel = new PIXI.Text(this.text, {
      font: this.font,
      fill: this.textColor
    });

    this.textLabel.y = this.size.height - this.textHeight + (this.textHeight - this.textLabel.height) / 2;
    if (this.textLabel.width > this.size.width) {
      this.textLabel.x = 10;
    } else {
      this.textLabel.x = (this.size.width - this.textLabel.width) / 2;
    }

    g.addChild(this.textLabel);
  }
  else {
    g.drawRect(0, 0, this.size.width, this.size.height);
  }
  g.endFill();
  this.addChild(g);

  this.imageSprite        = new PIXI.Sprite(this.placeHolderTexture);
  this.imageSprite.width  = this.size.width;
  this.imageSprite.height = this.showText ? this.size.height - this.textHeight : this.size.height;
  //this.imageSprite.setInteractive(true);

  if (this.imageUrl) {
    this.setContent(this.imageUrl);
  }

  this.addChild(this.imageSprite);

  this.stage.repaint();

};

/**
 * 设置广告招贴的图片和文字
 *
 * @param {string} imgUrl 海报的图片路径
 * @param {string} [text] - 海报的标题
 * @param {Object} [data] - 附加的数据
 */
Tile.prototype.setContent = function (imgUrl, text, data) {
  if (imgUrl) {
    imgUrl                   = imgUrl + '?t=' + (new Date()) * 1;
    this.posterTexture       = PIXI.Texture.fromImage(imgUrl);
    this.imageSprite.texture = this.posterTexture;
    var _stage               = this.stage;
    this.posterTexture.baseTexture.on('loaded', function () {
      _stage.repaint();
    });
  }

  if (this.showText && text) {
    this.textLabel.text = text;
    if (this.textLabel.width > this.size.width) {
      this.textLabel.x = 10;
    } else {
      this.textLabel.x = (this.size.width - this.textLabel.width) / 2;
    }
  }
  this.text         = text;
  this.data         = data;
  this.posterSetted = true;
};


/**
 * 销毁海报
 * Destroys the poster
 * @param {boolean} [reserveTexture=false] - 是否保留贴图, 默认不保存
 */
Tile.prototype.destroy = function (reserveTexture) {
  this.removeChildren();
  this.stage.removeChild(this);
  UIObject.prototype.destroy.call(this, true);

  //this.imageSprite.texture = this.placeHolderTexture;
  if (!reserveTexture) {
    if (this.posterTexture && this.posterSetted) {
      this.posterTexture.destroy(true);
    }
  }
  this.stage.repaint();
};

