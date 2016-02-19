(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tivy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * A Stage represents a canvas and an empty PIXI DisplayObject.
 * You can add child into stage directly.
 * And it can be repainted alone.
 *
 * ```js
 * var stage = new Tivy.Stage({
   *  id: 'stage01', //The canvas id
   *  size:{width:500, height:400}, //Size of the stage, w is width, h is heigt
   *  position:{x:0, y:0}, //Position of the stage
   *  background: '#ccc', //Backgound of the canvas, it is a css style.
   *  zIndex: 10 //z-index of the canvas, it is a css style.
   * });
 * ```
 *
 * @class
 * @memberof Tivy
 * @param options {json} - config json object.
 * @constructor
 */
var Stage = function (options) {
  if (!options) {
    options = {};
  }
  this.id         = options.id || 'stage_' + new Date() * 1;
  this.position   = options.position || {x: 0, y: 0};
  this.size       = options.size || {width: 1920, height: 1080};
  this.background = options.background;
  this.zIndex     = options.zIndex || 0;

  if (document.getElementById(this.id)) {
    throw new Error('Stage id is dumplicate');
  }


  this.width  = this.size.width;
  this.height = this.size.height;

  var canvas              = document.createElement('canvas');
  canvas.id               = this.id;
  canvas.style.position   = 'absolute';
  canvas.style.top        = this.position.y;
  canvas.style.left       = this.position.x;
  canvas.style.zIndex     = this.zIndex;
  canvas.style.background = this.background;

  document.body.appendChild(canvas);

  var _stage = new PIXI.Container();
  //_stage.screenX = this.position.x;
  //_stage.screenY = this.position.y;
  //_stage.width  = this.size.width;
  //_stage.height = this.size.height;

  this.render = new PIXI.WebGLRenderer(this.size.width, this.size.height, {
    transparent: true,
    view       : canvas,
    //antialias: true,
    forceFXAA  : true
  });

  _stage.id      = this.id;
  _stage.isStage = true;

  this._stage = _stage;

};

Stage.prototype = {
  /**
   * Show the stage.
   */
  show: function () {
    this.renderable = true;
    this.repaint();
  },
  /**
   * Hide the stage.
   */
  hide: function () {
    this.renderable = false;
    this.repaint();
  },

  /**
   * 重绘
   * @param uiObject {PIXI.DisplayObject} The object to repaint. if it is null, repaint this stage.
   */
  repaint: function (uiObject) {
    if (uiObject) {
      this.render.render(uiObject);
    } else {
      this.render.render(this._stage);
    }
  },

  /**
   * 增加子节点
   * @param uiObject {PIXI.DisplayObject} The object to add.
   */
  addChild: function (uiObject) {
    this._stage.addChild(uiObject);
  },

  removeChild: function (uiObject) {
    this._stage.removeChild(uiObject);
  }

};

module.exports = Stage;

},{}],2:[function(require,module,exports){
/**
 * This is a base class which can be placed to {@link Tivy.Stage}
 * 这个是可以放置到舞台上的基类.
 *
 * @class
 * @memberof Tivy
 * @param options {json} - 构造参数, 必须有 stage 参数
 * @constructor
 * @extends PIXI.Container
 */
function UIObject(options) {
  PIXI.Container.call(this);
  if (!options) {
    options = {};
  }

  this.stage = options.stage;
  if (!this.stage) {
    throw new Error('A stage is required.');
  }
  this.owner    = options.owner;
  this.position = options.position || {x: 0, y: 0};
  this.size     = options.size;
  if (this.size && this.size.width > 0 && this.size.height > 0) {
    this.width  = this.size.width;
    this.height = this.size.height;
  }
  if (this.owner) {
    this.owner.addChild(this);
  } else {
    this.stage.addChild(this);
  }
}

UIObject.prototype             = Object.create(PIXI.Container.prototype);
UIObject.prototype.constructor = UIObject;
module.exports                 = UIObject;

/**
 * 将这个置于顶部
 */
UIObject.prototype.bringToFront = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
  }
};

/**
 * 将这个置于底部
 */
UIObject.prototype.sendToBack = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChildAt(this, 0);
  }
};
},{}],3:[function(require,module,exports){
var UIObject = require('./UIObject');

/**
 * 描述了一个控件组, 并绑定了事件
 *
 * @class
 * @param options {json} 配置节点
 * @constructor
 * @memberof Tivy
 * @extends {Tivy.UIObject}
 */
function UIObjectGroup(options) {
  if (!options) {
    options = {};
  }
  this.size = options.size = options.size || {width: 200, height: 200};
  UIObject.call(this, options);


  /**
   * 这是控件的装载容器, 新建子控件的时候,需要指定 owner 为 这个 container. 创建这个控件的目的也是为了滑动整个内容
   * @readonly
   */
  this.container = new PIXI.Container();
  this.addChild(this.container);

  /**
   * 具有事件响应的控件们
   * @member {Array}
   * @readonly
   */
  this.controls = [];

  /**
   * 当前选中的 index
   * @member {number}
   * @readonly
   */
  this.currentIndex = -1;

  /**
   * 当前选中的控件
   * @member {Object}
   * @readonly
   */
  this.currentControl = null;

  /**
   * 当某个 tile 被执行的时候发生. 例如, 鼠标在tile上点击, touch点击, enter 键按下去
   * @example
   *
   metro.on('execute', function (target, index) {
      console.log('execute', target.text, index);
    });
   *
   *
   * @event execute
   * @memberof Tivy.UIObjectGroup#
   * @protected
   */

  /**
   * 当某个 tile 被聚焦的时候发生. 例如, 鼠标划过 tile, touch 按住, 键盘聚焦等
   *
   * @example
   metro.on('focus', function (target, index) {
      console.log('focus', target.text, index);
    });
   *
   *
   * @event focus
   * @memberof Tivy.UIObjectGroup#
   * @protected
   */

  /**
   * 当某个 tile 失去焦点的时候发生. 例如, 鼠标划过 tile, touch 松开, 键盘移除聚焦等
   *
   * @event leave
   * @memberof Tivy.UIObjectGroup#
   * @protected
   */

  /**
   * 当某个组内的tile改变的时候发生
   * @example
   *
   * metro.on('change', function (target, index, oldTarget, oldIndex) {
   *   console.log('change', target.text, index);
   * });
   *
   *
   * @event change
   * @memberof Tivy.UIObjectGroup#
   * @protected
   */

}

UIObjectGroup.prototype             = Object.create(UIObject.prototype);
UIObjectGroup.prototype.constructor = UIObjectGroup;
module.exports                      = UIObjectGroup;


//UIObjectGroup.prototype._init = function () {
//  var _this = this;
//};

/**
 * 给控件附加事件
 * @param uiObject {Object} 子元素控件, 在初始化元素之后附加事件
 * @example
 *
 var tile = new Tile({
      stage             : _this.stage,
      owner             : someGoupContainer,
      size              : {width: ele.width, height: ele.height},
      position          : {x: ele.x, y: ele.y},
      placeHolderTexture: _this.layout.placeHolderTexture,
      radius            : 10,
      data              : somedata
    });
 someGoupContainer.attachEvent(tile);
 *
 */
UIObjectGroup.prototype.attachEvent = function (uiObject) {

  this.controls.push(uiObject);
  var i = this.controls.indexOf(uiObject);

  var _this = this;
  uiObject.on('mouseover', function () {
    var oldIndex         = _this.currentIndex;
    var oldCtr           = _this.currentControl;
    _this.currentIndex   = i;
    _this.currentControl = this;
    _this.emit('focus', this, i);
    if (oldIndex !== i) {
      _this.emit('change', this, i, oldCtr, oldIndex);
    }
  });
  uiObject.on('mouseout', function () {
    _this.emit('leave', this, i);
  });
  uiObject.on('keydown', function () {
    console.log('keydown');
  });

  uiObject.on('touchstart', function () {
    var oldIndex         = _this.currentIndex;
    var oldCtr           = _this.currentControl;
    _this.currentIndex   = i;
    _this.currentControl = this;
    _this.emit('focus', this, i);
    if (oldIndex !== i) {
      _this.emit('change', this, i, oldCtr, oldIndex);
    }
  });
  uiObject.on('touchend', function (data) {
    if (_this.currentControl == data.target) {
      _this.emit('execute', this, i);
    }
    _this.emit('leave', _this.currentControl, _this.currentIndex);
  });
  uiObject.on('click', function (data) {
    _this.emit('execute', this, i);
  });

};

/**
 * 当控件组重新被聚焦的时候, 触发 change 事件
 */
UIObjectGroup.prototype.activate = function () {
  if (this.isActive) {
    return;
  }
  UIObject.prototype.activate.call(this);

  if (this.currentIndex < 0) {
    this.currentIndex   = 0;
    this.currentControl = this.controls[0];
  }
  this.emit('change', this.currentControl, this.currentIndex, null, -1);

};
},{"./UIObject":2}],4:[function(require,module,exports){
var UIObject = require('../UIObject');

/**
 * 这是一个按钮, 默认开启了事件支持.
 *
 * @class
 * @param options  {json} 配置节点
 * @example
 * {
 *  stage: stage01, //Instance of Stage
 *  size: {width: 300, height: 400},
 *  position: {x: 0, y: 0},
 *  textureDefault: textureDefault, //required.
 *  textureDown: textureDown,
 * }
 *
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


},{"../UIObject":2}],5:[function(require,module,exports){
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
},{"../UIObject":2}],6:[function(require,module,exports){
var UIObject = require('../UIObject');
/**
 * 广告招贴
 *
 *
 * ```javascript
 *
 var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');
 xTexture.baseTexture.on('loaded', function () {
    var poster = new Tivy.Poster({
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

 * ```
 * @class
 * @memberof Tivy
 * @param options {json} 配置节点
 * ```json
 * {
 *  stage: stage01, //Instance of Stage
 *  size: {width: 300, height: 400},
 *  position: {x: 0, y: 0},
 *  textColor: 0x7f7f7f,
 *  textBgColor: 0xffffff,
 *  textHeight: 50,
 *  font: '25px 迷你简准圆',
 *  text: '标题',
 *  imageUrl: someUrl,
 *  radius: 10,
 *  showText: false
 * }
 * ```
 * @constructor
 * @extends Tivy.UIObject
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
 * @param imgUrl {string} 海报的图片路径
 * @param text {string} 海报的标题
 * @param data {Object} 附加的数据
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
 * @param [reserveTexture=false] {boolean} 是否保留贴图, 默认不保存
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


},{"../UIObject":2}],7:[function(require,module,exports){
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
},{"../UIObjectGroup":3,"../basic/Tile":6}],8:[function(require,module,exports){
var UIObject = require('../UIObject');
/**
 * 广告招贴
 *
 *
 * ```javascript
 *
 var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');
 xTexture.baseTexture.on('loaded', function () {
    var poster = new Tivy.Poster({
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

 * ```
 * @class
 * @memberof Tivy
 * @constructor
 * @extends Tivy.UIObject
 * @param options {json} 配置节点
 * ```json
 * {
 *  stage: stage01, //Instance of Stage
 *  size: {width: 300, height: 400},
 *  position: {x: 0, y: 0},
 *  textColor: 0x7f7f7f,
 *  textBgColor: 0xffffff,
 *  textHeight: 50,
 *  font: '25px 迷你简准圆',
 *  text: '标题',
 *  imageUrl: someUrl,
 *  radius: 10,
 *  showText: false
 * }
 * ```
 */
function Poster(options) {
  if (!options) {
    options = {};
  }
  this.size = options.size = options.size || {width: 300, height: 400};
  UIObject.call(this, options);

  this.placeHolderTexture = options.placeHolderTexture;
  if (!this.placeHolderTexture) {
    throw new Error('placeHolderTexture is null');
  }

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

  this._paint();
}

Poster.prototype             = Object.create(UIObject.prototype);
Poster.prototype.constructor = Poster;
module.exports               = Poster;

/**
 * 画上去
 *
 * @private
 */
Poster.prototype._paint = function () {
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
 * @param imgUrl {string} 海报的图片路径
 * @param text {string} 海报的标题
 */
Poster.prototype.setContent = function (imgUrl, text) {
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
  this.posterSetted = true;
};


/**
 * 销毁海报
 * Destroys the poster
 * @param reserveTexture {boolean} 是否保留贴图, 默认不保存
 */
Poster.prototype.destroy = function (reserveTexture) {
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


},{"../UIObject":2}],9:[function(require,module,exports){
/**
 * 键盘事件管理器, 此类已经混合进 UIObject, 可以直接在 UIObject 示例上进行调用
 * @mixin
 * @class
 * @constructor
 * @memberof Tivy
 */
function KeyboardManager() {
  /**
   * 目标 object 是否可以响应键盘事件
   *
   * @member {boolean}
   */
  this.isActive = false;


  /**
   * 按键区域被激活后
   * @example
   * metro.on('activated', function () {});
   * @event activated
   * @memberof Tivy.KeyboardManager#
   */

  /**
   * 激活区域被取消
   * @event deactivated
   * @memberof Tivy.KeyboardManager#
   */
  /**
   * 键盘被按
   * @event keypress
   * @memberof Tivy.KeyboardManager#
   */

  /**
   * 按键按下
   * @example
   * metro.on('keydown', function () {});
   * @event keydown
   * @memberof Tivy.KeyboardManager#
   */

  /**
   * 按键抬起
   * @event keyup
   * @memberof Tivy.KeyboardManager#
   */


}

KeyboardManager.prototype.constructor = KeyboardManager;
module.exports                        = KeyboardManager;

/**
 * 激活按键区域, 并绑定事件
 */
KeyboardManager.prototype.activate = function () {
  if (this.isActive) {
    return;
  }
  this.isActive = true;


  var _this = this;
  window.document.addEventListener('keydown', function (keyboardEvent) {
    _this.emit('keydown', keyboardEvent);
  }, true);
  window.document.addEventListener('keyup', function (keyboardEvent) {
    _this.emit('keyup', keyboardEvent);
  }, true);
  window.document.addEventListener('keypress', function (keyboardEvent) {
    _this.emit('keypress', keyboardEvent);
  }, true);

  this.emit('activated');
};

/**
 * 取消激活
 */
KeyboardManager.prototype.deactivate = function () {
  if (!this.isActive) {
    return;
  }


  this.isActive = false;
  window.document.removeEventListener('keydown');
  window.document.removeEventListener('keyup');
  window.document.removeEventListener('keypress');

  this.emit('deactivated');

};

},{}],10:[function(require,module,exports){
(function (global){
var tivy = module.exports = {
  UIObject       : require('./UIObject'),
  UIObjectGroup  : require('./UIObjectGroup'),
  Stage          : require('./Stage'),
  Button         : require('./basic/Button'),
  Tile           : require('./basic/Tile'),
  ImageFrame     : require('./basic/ImageFrame'),
  Poster         : require('./components/Poster'),
  Metro          : require('./components/Metro'),
  KeyboardManager: require('./events/KeyboardManager'),
};

//mixin tow class
Object.assign(
  tivy.UIObject.prototype,
  tivy.KeyboardManager.prototype
);


global.Tivy = tivy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Stage":1,"./UIObject":2,"./UIObjectGroup":3,"./basic/Button":4,"./basic/ImageFrame":5,"./basic/Tile":6,"./components/Metro":7,"./components/Poster":8,"./events/KeyboardManager":9}]},{},[10])(10)
});


//# sourceMappingURL=tivy.js.map
