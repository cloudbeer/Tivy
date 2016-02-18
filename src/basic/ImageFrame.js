var UIObject = require('../UIObject');

/**
 * 这是一个图片外框, 你可以指定一个带有阴影的正方形图片.
 * ```
 var frame = new Tivy.ImageFrame({
      stage: stage,
      imageUrl: './assets/img/frame.png',
      position: {x: 100, y: 100},
      size: {
        width: 50, height: 50,
      },
      borderLength: 61,
      radius: 15,
      imageLength: 130
    });

 * ```
 * @class
 * @memberof Tivy
 * @constructor
 * @extends Tivy.UIObject
 * @param options  {json} 配置节点
 */
function ImageFrame(options) {
  if (!options) {
    options = {};
  }
  this.size = options.size = options.size || {width: 200, height: 200};
  UIObject.call(this, options);

  this.imageUrl = options.imageUrl;
  if (!this.imageUrl) {
    throw new Error('Frame imageUrl is required.');
  }

  this.radius       = options.radius;
  this.borderLength = options.borderLength;
  this.imageLength  = options.imageLength;

  this._init();
}


ImageFrame.prototype             = Object.create(UIObject.prototype);
ImageFrame.prototype.constructor = ImageFrame;
module.exports                   = ImageFrame;

ImageFrame.prototype._init = function () {
  var ttFrame = PIXI.Texture.fromImage(this.imageUrl);

  var cltTT = new PIXI.Texture(ttFrame, {
    x: 0, y: 0, width: this.borderLength, height: this.borderLength,
  });
  var ctTT  = new PIXI.Texture(ttFrame, {
    x: this.borderLength, y: 0, width: 1, height: this.borderLength,
  });

  var crtTT = new PIXI.Texture(ttFrame, {
    x     : this.imageLength - this.borderLength,
    y     : 0,
    width : this.borderLength,
    height: this.borderLength,
  });
  var crTT  = new PIXI.Texture(ttFrame, {
    x     : this.imageLength - this.borderLength,
    y     : this.borderLength,
    width : this.borderLength,
    height: 1,
  });
  var crbTT = new PIXI.Texture(ttFrame, {
    x     : this.imageLength - this.borderLength,
    y     : this.imageLength - this.borderLength,
    width : this.borderLength,
    height: this.borderLength,
  });
  var cbTT  = new PIXI.Texture(ttFrame, {
    x     : this.borderLength,
    y     : this.imageLength - this.borderLength,
    width : 1,
    height: this.borderLength,
  });
  var clbTT = new PIXI.Texture(ttFrame, {
    x     : 0,
    y     : this.imageLength - this.borderLength,
    width : this.borderLength,
    height: this.borderLength,
  });
  var clTT  = new PIXI.Texture(ttFrame, {
    x: 0, y: this.borderLength, width: this.borderLength, height: 1,
  });
  var clt   = this._clt = new PIXI.Sprite(cltTT);
  var ct = this._ct = new PIXI.Sprite(ctTT);
  var crt = this._crt = new PIXI.Sprite(crtTT);
  var cr = this._cr = new PIXI.Sprite(crTT);
  var crb = this._crb = new PIXI.Sprite(crbTT);
  var cb = this._cb = new PIXI.Sprite(cbTT);
  var clb = this._clb = new PIXI.Sprite(clbTT);
  var cl = this._cl = new PIXI.Sprite(clTT);

  this.addChild(clt);
  this.addChild(ct);
  this.addChild(crt);
  this.addChild(cr);
  this.addChild(crb);
  this.addChild(cb);
  this.addChild(clb);
  this.addChild(cl);
  this.setSize(this.size);
};


/**
 * 设置尺寸
 * @param newSize {json} 尺寸
 * ```json
 * {width:100, height:100}
 * ```
 */
ImageFrame.prototype.setSize = function (newSize) {
  var nWidth  = newSize.width,
      nHeight = newSize.height;
  if (nWidth <= 2 * this.radius) {
    nWidth = 2 * this.radius + 1;
  }
  if (nHeight <= 2 * this.radius) {
    nHeight = 2 * this.radius + 1;
  }

  this.size.width  = nWidth;
  this.size.height = nHeight;
  // size.x = Math.round(size.x);
  // size.y = Math.round(size.y);

  this._clt.position = {
    x: -this.borderLength + this.radius, y: -this.borderLength + this.radius,
  };
  this._crt.position = {
    x: nWidth - this.radius, y: this.radius - this.borderLength,
  };
  this._crb.position = {
    x: nWidth - this.radius, y: nHeight - this.radius,
  };
  this._clb.position = {
    x: this.radius - this.borderLength, y: nHeight - this.radius,
  };
  this._ct.position  = {
    x: this.radius, y: -this.borderLength + this.radius,
  };
  this._ct.width     = nWidth - this.radius * 2;
  this._cr.position  = {
    x: nWidth - this.radius, y: this.radius,
  };
  this._cr.height    = nHeight - this.radius * 2;
  this._cb.position  = {
    x: this.radius, y: nHeight - this.radius,
  };

  this._cb.width    = nWidth - this.radius * 2;
  this._cl.position = {
    x: this.radius - this.borderLength, y: this.radius,
  };
  this._cl.height   = nHeight - this.radius * 2;

};

/**
 * 设置位置
 *
 * @param newPosition {json} 位置
 * ```json
 * { x:10, y:10 }
 * ```
 */
ImageFrame.prototype.setPosition = function (newPosition) {
  this.x = newPosition.x;
  this.y = newPosition.y;
};

/**
 * 设置一个框框
 *
 * @param newBounds {json} 框框
 * ```json
 * { x:0, y:0, width:100, height:100 }
 * ```
 */
ImageFrame.prototype.setBounds = function (newBounds) {
  this.x = newBounds.x;
  this.y = newBounds.y;
  this.setSize({width: newBounds.width, height: newBounds.height});

};