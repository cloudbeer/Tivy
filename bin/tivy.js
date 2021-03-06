(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tivy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * 舞台包含了一个 html 的 canvas, 一个 空的 PIXI Container.
 * 创建之后, 这个舞台就已经画到了网页中.
 * 网页中可以添加多个舞台, 以实现独立渲染.
 *
 * A Stage represents a canvas and an empty PIXI Container.
 * You can add child into stage directly.
 * And it can be repainted alone.
 *
 * @example
 * var stage = new Tivy.Stage({
 *  id: 'stage01', //The canvas id
 *  size:{width:500, height:400}, //Size of the stage, w is width, h is heigt
 *  position:{x:0, y:0}, //Position of the stage
 *  background: '#ccc', //Backgound of the canvas, it is a css style.
 *  zIndex: 10 //z-index of the canvas, it is a css style.
 * });
 *
 *
 * @class
 * @memberof Tivy
 * @param {json} options - config json object.
 * @param {string} options.id - 此舞台的 id, 渲染之后 canvas 的 id 也是这个.
 * @param {{x:number, y:number}} options.position={x:0,y:0} - 位置
 * @param {{width:number, height:number}} options.size={width:1920,height:1080} - 大小
 * @param {string} options.background - 画布的背景（这是一个 css 属性）
 * @param {number} options.zIndex - 画布的层级 （这是一个 css 属性）
 *
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
   * 显示舞台
   * Show the stage.
   */
  show: function () {
    this.renderable = true;
    this.repaint();
  },
  /**
   * 隐藏舞台
   * Hide the stage.
   */
  hide: function () {
    this.renderable = false;
    this.repaint();
  },

  /**
   * 重绘
   * @param {PIXI.DisplayObject} uiObject  - The object to repaint. if it is null, repaint this stage.
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
   * @param  {PIXI.DisplayObject} uiObject - The object to add.
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
 * @extends PIXI.Container
 * @param {Object} options  - json 格式的参数
 * @param {Tivy.Stage} options.stage  - 舞台, 这个参数必须设置
 * @param {PIXI.DisplayObject} options.owner  - 当前物体的父容器
 * @param {{x:number, y:number}} options.position={x:0,y:0} - 位置
 * @param {{width:number, height:number}} options.size - 大小
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
 * @param options {json} 配置节点, 没有特殊的配置, 参考 {@link Tivy.UIObject}
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
  //uiObject.on('keydown', function () {
  //  console.log('keydown');
  //});

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

  //uiObject.on('keydown', function (data) {
  //  console.log('keypress', data);
  //  //_this.emit('execute', this, i);
  //});

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
var EASINGS = require('../const').EASINGS;

/**
 * 一个动画, 这个单词是我故意写错的
 * An animation, this is a wrong word, it is cool!
 *
 * 动画参考了这个 {@link http://javascript.info/tutorial/animation}
 *
 * @class
 * @memberof Tivy
 * @param {json} options - 动画配置
 * @param {Object} options.target - 这个是一个函数,指定 target 的属性
 * @param {string} options.property - 需要变化的物件的属性, 如 'x'
 * @param {number} options.to - 结束的值
 * @param {number} [options.duration=1000] - 运行动画的总时间, 单位 ms
 * @param {function} [options.easing=Tivy.CONST.EASINGS.linear] - 缓动函数,计算属性变化. 默认参考 {@link Tivy.CONST}
 * @param {function} [options.step] - 这个是一个函数, 用于指定 target 的属性
 * @param {number} [options.from] - 开始的值, 如果不指定, 就是动画开始前物体的该属性值
 */
function Animal(options) {
  this.target   = options.target;
  this.property = options.property;
  this.duration = options.duration || 1000;
  this.easing   = options.easing || EASINGS.linear;
  this.step     = options.step;
  this.from     = options.from;
  this.to       = options.to;


  this.tag      = null;
  this.reserve  = false;
  this.finished = false;

  this._start = new Date;

}


Animal.prototype.constructor = Animal;
module.exports               = Animal;


//Object.defineProperties(Animal.prototype, {
//  property:{
//    get: function(){
//      return this.property;
//    }
//  }
//
//});
},{"../const":10}],5:[function(require,module,exports){
var Animal = require('./Animal');
var CONST  = require('../const');

/**
 * 动画管理器
 * @param options {json} 配置
 * @param options.stage {Tivy.Stage} 舞台, 动画的舞台应该和需要运行的物体的舞台一致
 * @param options.duration {number} 动画的运行时间, 单位: ms
 * @param options.fps=60 {number} 帧速率
 * @constructor
 * @memberof Tivy
 *
 * @example
 *
 *  var manager = new Tivy.AnimalManager({
 *     stage   : stage,
 *     duration: 300,
 *     fps     : 30
 *   });
 *  manager.runAnimals();
 */
function AnimalManager(options) {
  /**
   * 舞台
   * @readonly
   */
  this.stage = options.stage;
  /**
   * 动画运行时间（具体动画如果未指定此属性,则使用管理器的）
   * @member  {number}
   */
  this.duration = options.duration;
  /**
   * 帧速率（具体动画如果未指定此属性,则使用管理器的）
   * @member  {number}
   */
  this.fps = options.fps || 60;

  this.delay = 1000 / this.fps;
  /**
   * 动画数组
   * @member {Array}
   * @readonly
   */
  this.animals = [];


}

AnimalManager.prototype.constructor = AnimalManager;
module.exports                      = AnimalManager;

/**
 * 寻找满足条件的动画
 * @param _target
 * @param _property
 * @returns {Tivy.Animal}
 */
AnimalManager.prototype.findAnimal = function (_target, _property) {
  var animals = this.animals.filter(function (ele) {
    return ele.target === _target && ele.property === _property;
  });
  if (animals.length > 0) {
    return animals[0];
  }
  return null;
};


/**
 * 增加一个动画物件.
 * @deprecated 请使用 addAnimal 方法
 * @param _target {PIXI.DisplayObject} 需要移动的物体
 * @param _property {string} 物体的属性,比如 "width"
 * @param _to {number} 移动到的值
 * @param _from {number} 从哪儿开始移动
 */
AnimalManager.prototype.addTarget = function (_target, _property, _to, _from) {
  if (_target.stage !== this.stage) {
    throw new Error('This target is not in this stage.');
  }
  var av3 = arguments[4];
  var av4 = arguments[5];
  var av5 = arguments[6];
  var av6 = arguments[7];
  var avs = this.parseArg(av3, av4, av5, av6);

  var animal = this.findAnimal(_target, _property);

  if (!animal) {
    animal = new Animal({
      target: _target
    });
    this.animals.push(animal);
  }

  animal.property = _property;
  animal.from     = _from == null ? _target[_property] : _from;
  animal.to       = _to;
  animal.step     = function (delta) {
    _target[_property] = this.from + (_to - this.from) * delta;
  };
  animal.easing   = avs._easing || CONST.EASINGS.linear;
  animal.duration = avs._duration || this.duration;
  animal.delay    = 1000 / this.fps;
  animal.reserve  = avs._reserve;
  animal.tag      = avs._tag;
  animal.finished = false;
};

/**
 * 增加一个动画
 * @param _animal {json} 一个json 配置
 * @param _animal.target {PIXI.DisplayObject} 需要动画的物件
 * @param _animal.property {string} 活动属性
 * @param _animal.to {number} 结束的数值
 * @param _animal.from=target.property {number} 开始的数值（默认为当前物件的该属性值）
 * @param _animal.step {function} 赋值的函数
 * @param _animal.easing=CONST.EASINGS.linear {function} 缓动函数, 默认是 linear
 * @param _animal.duration {number} 运行时间
 *
 * @example
 *
 * manager.addAnimal({
 *       target  : frame,
 *       property: 'frameHeight',
 *       to      : target.height
 *     });
 */
AnimalManager.prototype.addAnimal = function (_animal) {
  var _target = _animal.target;
  if (_target.stage !== this.stage) {
    throw new Error('This target is not in this stage.');
  }
  var _property = _animal.property;

  var animal = this.findAnimal(_target, _property);

  if (!animal) {
    animal          = new Animal({
      target: _target
    });
    animal.property = _property;
    this.animals.push(animal);
  }
  var _to       = _animal.to;
  var _from     = _animal.from;
  var _step     = _animal.step;
  var _easing   = _animal.easing || CONST.EASINGS.linear;
  var _duration = _animal.duration || this.duration;
  var _reserve  = _animal.reserve;
  var _tag      = _animal.tag;
  if (!_from && _property) {
    _from = _target[_property];
  }
  if (!_step) {
    _step = function (delta) {
      _target[_property] = this.from + (_to - this.from) * delta;
    };
  }
  animal.from     = _from;
  animal.to       = _to;
  animal.step     = _step;
  animal.easing   = _easing;
  animal.duration = _duration;
  animal.delay    = 1000 / this.fps;
  animal.reserve  = _reserve;
  animal.tag      = _tag;
  animal.finished = false;
};

/**
 * 运行动画管理器
 */
AnimalManager.prototype.runAnimals = function () {

  var _this = this;

  var idTimer = window.setInterval(function () {

    var index = 0;
    _this.animals.forEach(function (ele) {
      if (ele.finished) {
        _this.animals.splice(index, 1);
      } else {
        var timePassed = new Date - ele._start;
        var progress   = timePassed / ele.duration;
        if (progress > 1) {
          progress = 1;
        }
        var delta = ele.easing(progress);
        ele.step(delta);
        if (progress == 1) {
          ele.finished = true;
        }
      }
      index++;
    });
    if (_this.animals.length > 0) {
      _this.stage.repaint();
    }
  }, this.delay);

};

///**
// * 解析动画参数
// * @param v1
// * @param v2
// * @param v3
// * @param v4
// * @returns {{}}
// */
AnimalManager.prototype.parseArg = function (v1, v2, v3, v4) {
  var t1  = typeof v1;
  var t2  = typeof v2;
  var t3  = typeof v3;
  var t4  = typeof v4;
  var rtn = {};
  if (t1 === 'number') {
    rtn._duration = v1;
  } else if (t2 === 'number') {
    rtn._duration = v2;
  } else if (t3 === 'number') {
    rtn._duration = v3;
  } else if (t4 === 'number') {
    rtn._duration = v4;
  }
  if (t1 === 'string') {
    rtn._tag = v1;
  } else if (t2 === 'string') {
    rtn._tag = v2;
  } else if (t3 === 'string') {
    rtn._tag = v3;
  } else if (t4 === 'string') {
    rtn._tag = v4;
  }
  if (t1 === 'function') {
    rtn._easing = v1;
  } else if (t2 === 'function') {
    rtn._easing = v2;
  } else if (t3 === 'function') {
    rtn._easing = v3;
  } else if (t4 === 'function') {
    rtn._easing = v4;
  }
  if (t1 === 'boolean') {
    rtn._reserve = v1;
  } else if (t2 === 'boolean') {
    rtn._reserve = v2;
  } else if (t3 === 'boolean') {
    rtn._reserve = v3;
  } else if (t4 === 'boolean') {
    rtn._reserve = v4;
  }
  return rtn;
};

},{"../const":10,"./Animal":4}],6:[function(require,module,exports){
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


},{"../UIObject":2}],7:[function(require,module,exports){
var UIObject = require('../UIObject');

/**
 * 这是一个图片外框, 你可以指定一个带有阴影的正方形图片.
 * @example
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

 *
 * @class
 * @memberof Tivy
 * @extends Tivy.UIObject
 * @param {json} options - 配置节点
 * @param {json} options.imageUrl - 框框的图片地址. 这个图片是一个完整的图片外框.
 *                                  这个图片应该是一个正方形, 图片的四个边应该可以拉伸. 系统自动切除.
 * @param {json} options.radius - 图片外框的圆角半径. 图片的不可拉伸部分.
 * @param {json} options.borderLength - 图片的框线的长度.
 * @param {json} options.imageLength - 整张图片的长度.
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


Object.defineProperties(ImageFrame.prototype, {
  /**
   * 获取或者设置框架的宽度
   *
   * @member {number}
   * @memberof Tivy.ImageFrame#
   */
  frameWidth : {
    get: function () {
      return this.size.width;
    },
    set: function (value) {
      this.setSize({width: value, height: this.size.height});
    }
  },
  /**
   * 获取或者设置框架的高度
   *
   * @member {number}
   * @memberof Tivy.ImageFrame#
   */
  frameHeight: {
    get: function () {
      return this.size.height;
    },
    set: function (value) {
      this.setSize({width: this.size.width, height: value});
    }

  }
});

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
},{"../UIObject":2}],8:[function(require,module,exports){
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


},{"../UIObject":2}],9:[function(require,module,exports){
var UIObjectGroup = require('../UIObjectGroup');
var Tile          = require('../basic/Tile');
var KEY_CODES     = require('../const').KEY_CODES;

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

  });

 *
 *
 *
 * @class
 * @memberof Tivy
 * @extends {Tivy.UIObjectGroup}
 * @param {json} options  - Metro config
 * @param {json} options.layout  - 布局配置
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
    var tile      = new Tile({
      stage             : _this.stage,
      owner             : _this.container,
      size              : {width: ele.width, height: ele.height},
      position          : {x: ele.x, y: ele.y},
      placeHolderTexture: _this.layout.placeHolderTexture,
      radius            : ele.radius == null ? _this.layout.radius : ele.radius,
      data              : ele.data,
      myIndex           : i
    });
    tile.myLayout = ele;
    _this.attachEvent(tile);
  });

  this.on('keydown', function (evt) {
    //var _this    = this;
    var oldCtr   = this.currentControl;
    var oldIndex = this.currentIndex;
    var mearContrl;
    switch (evt.which) {
      case KEY_CODES.ENTER:
        this.emit('execute', this.currentControl, this.currentIndex);
        break;
      case KEY_CODES.RIGHT:
        var myRightControls = this.controls.filter(function (ele) {
          return ele.myLayout.x > oldCtr.myLayout.x //左边要大
            && ele.myLayout.x + ele.myLayout.width > oldCtr.myLayout.x + oldCtr.myLayout.width //右边也大
            && ele.myLayout.y + ele.myLayout.height > oldCtr.myLayout.y //不能完全在上面
            && ele.myLayout.y < oldCtr.myLayout.y + oldCtr.myLayout.height; //不能完全在下面
        });

        if (myRightControls.length > 0) {
          mearContrl          = myRightControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
      case KEY_CODES.LEFT:
        var myLeftControls = this.controls.filter(function (ele) {
          return ele.myLayout.x < oldCtr.myLayout.x
            && ele.myLayout.x + ele.myLayout.width < oldCtr.myLayout.x + oldCtr.myLayout.width //右边也大
            && ele.myLayout.y + ele.myLayout.height > oldCtr.myLayout.y //不能完全在上面
            && ele.myLayout.y < oldCtr.myLayout.y + oldCtr.myLayout.height; //不能完全在下面
        });
        if (myLeftControls.length > 0) {
          mearContrl          = myLeftControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        this.currentControl = this.controls[this.currentIndex];
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
      case KEY_CODES.UP:
        var myUpControls = this.controls.filter(function (ele) {
          return ele.myLayout.y < oldCtr.myLayout.y
            && ele.myLayout.y + ele.myLayout.height < oldCtr.myLayout.y + oldCtr.myLayout.height
            && ele.myLayout.x + ele.myLayout.width > oldCtr.myLayout.x //不能完全在左边面
            && ele.myLayout.x < oldCtr.myLayout.x + oldCtr.myLayout.width; //不能完全在右边
        });
        if (myUpControls.length > 0) {
          mearContrl          = myUpControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        this.currentControl = this.controls[this.currentIndex];
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
      case KEY_CODES.DOWN:
        var myDownControls = this.controls.filter(function (ele) {
          return ele.myLayout.y > oldCtr.myLayout.y
            && ele.myLayout.y + ele.myLayout.height > oldCtr.myLayout.y + oldCtr.myLayout.height
            && ele.myLayout.x + ele.myLayout.width > oldCtr.myLayout.x //不能完全在左边面
            && ele.myLayout.x < oldCtr.myLayout.x + oldCtr.myLayout.width; //不能完全在右边
        });
        if (myDownControls.length > 0) {
          mearContrl          = myDownControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        this.currentControl = this.controls[this.currentIndex];
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
    }
  });

};

/**
 * 绑定数据
 *
 * @param {Object} newData - 绑定的数据, 格式如下:
 *
 * ```
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
 * ```
 *
 */
Metro.prototype.bindData = function (newData) {
  var _this = this;
  newData.forEach(function (ele, i) {
    _this.controls[i].setContent(ele.imageUrl, ele.text, ele.data);
  });
};


},{"../UIObjectGroup":3,"../basic/Tile":8,"../const":10}],10:[function(require,module,exports){
/**
 * 静态值
 * Constant values used in Tivy
 *
 * @namespace
 * @static
 * @memberof Tivy
 */
var CONST = {
  /**
   * 键盘的键值, 定义了通用遥控器的主要键
   * Main keycode of remoter
   * @property {Object} KEY_CODES - 键盘的按键值
   * @property {number} KEY_CODES.ENTER=13 - 回车
   * @property {number} KEY_CODES.ESC=27 - 返回
   * @property {number} KEY_CODES.LEFT=37 - 左
   * @property {number} KEY_CODES.UP=38 - 上
   * @property {number} KEY_CODES.RIGHT=39 - 右
   * @property {number} KEY_CODES.DOWN=40 - 下
   */
  KEY_CODES: {
    ENTER : 13,
    ESC   : 27,
    LEFT  : 37,
    UP    : 38,
    RIGHT : 39,
    DOWN  : 40,
    ENTER2: 108,

    //多媒体
    SEARCH  : 170,
    FAVORITE: 171,
    BROWSER : 172,
    MUTE    : 173,
    VOL_DOWN: 174,
    VOL_UP  : 175,
    STOP    : 179,
    EMAIL   : 180
  },
  /**
   * 缓动函数
   *
   * @property {function} linear - 线性动画
   * @property {function} swing - swing
   * @property {function} easeInQuad - easeInQuad
   * @property {function} easeOutQuad - easeOutQuad
   * @property {function} easeInOutQuad - easeInOutQuad
   * @property {function} easeInCubic - easeInCubic
   * @property {function} easeOutCubic - easeOutCubic
   * @property {function} easeInOutCubic - easeInOutCubic
   * @property {function} easeInQuart - easeInQuart
   * @property {function} easeOutQuart - easeOutQuart
   * @property {function} easeInOutQuart - easeInOutQuart
   * @property {function} easeInQuint - easeInQuint
   * @property {function} easeOutQuint - easeOutQuint
   * @property {function} easeInOutQuint - easeInOutQuint
   * @property {function} easeInSine - easeInSine
   * @property {function} easeOutSine - easeOutSine
   * @property {function} easeInOutSine - easeInOutSine
   * @property {function} easeInExpo - easeInExpo
   * @property {function} easeOutExpo - easeOutExpo
   * @property {function} easeInOutExpo - easeInOutExpo
   * @property {function} easeInCirc - easeInCirc
   * @property {function} easeOutCirc - easeOutCirc
   * @property {function} easeInOutCirc - easeInOutCirc
   * @property {function} easeInElastic - easeInElastic
   * @property {function} easeOutElastic - easeOutElastic
   * @property {function} easeInOutElastic - easeInOutElastic
   * @property {function} easeInBack - easeInBack
   * @property {function} easeOutBack - easeOutBack
   * @property {function} easeInOutBack - easeInOutBack
   * @property {function} easeOutBounce - easeOutBounce
   */
  EASINGS  : {
    linear: function (t) {
      return t;
    },
    swing : function (t) {
      return 0.5 - Math.cos(t * Math.PI) / 2;
    },

    easeInQuad      : function (t) {
      return t * t;
    },
    // decelerating to zero velocity
    easeOutQuad     : function (t) {
      return t * (2 - t);
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad   : function (t) {
      return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    // accelerating from zero velocity
    easeInCubic     : function (t) {
      return t * t * t;
    },
    // decelerating to zero velocity
    easeOutCubic    : function (t) {
      return (--t) * t * t + 1;
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic  : function (t) {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    // accelerating from zero velocity
    easeInQuart     : function (t) {
      return t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuart    : function (t) {
      return 1 - (--t) * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart  : function (t) {
      return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    // accelerating from zero velocity
    easeInQuint     : function (t) {
      return t * t * t * t * t;
    },
    // decelerating to zero velocity
    easeOutQuint    : function (t) {
      return 1 + (--t) * t * t * t * t;
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint  : function (t) {
      return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    },
    easeInSine      : function (t) {
      return -Math.cos(t * (Math.PI / 2)) + 1;
    },
    easeOutSine     : function (t) {
      return Math.sin(t * (Math.PI / 2));
    },
    easeInOutSine   : function (t) {
      return -1 / 2 * (Math.cos(Math.PI * t) - 1);
    },
    //easeOutInSine   : function (t) {
    //  if (t < 0.5) {
    //    return this.easeOutSine(t);
    //  }
    //  return this.easeInSine(t);
    //},
    easeInExpo      : function (t) {
      return (t == 0) ? 0 : Math.pow(2, 10 * (t - 1));
    },
    easeOutExpo     : function (t) {
      return (t == 1) ? 1 : (-Math.pow(2, -10 * t) + 1);
    },
    easeInOutExpo   : function (t) {
      if (t == 0) {
        return 0;
      }
      if (t == 1) {
        return 1;
      }
      t = t * 2;
      if (t < 1) {
        return 1 / 2 * Math.pow(2, 10 * (t - 1)) - 0.0005;
      }
      t = t - 1;
      return 1 / 2 * 1.0005 * (-Math.pow(2, -10 * t) + 2);
    },
    //easeOutInExpo   : function (t) {
    //  if (t < 0.5) {
    //    return CONST.EASINGS.easeOutExpo(t);
    //  }
    //  return CONST.EASINGS.easeInExpo(t);
    //},
    easeInCirc      : function (t) {
      return -1 * (Math.sqrt(1 - t * t) - 1);
    },
    easeOutCirc     : function (t) {
      t = t - 1;
      return Math.sqrt(1 - t * t);
    },
    easeInOutCirc   : function (t) {
      if ((t /= 1 / 2) < 1) {
        return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
      }
      return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    //easeOutInCirc   : function (t) {
    //  if (t < 0.5) {
    //    return CONST.EASINGS.easeOutCirc(t);
    //  }
    //  return CONST.EASINGS.easeInCirc(t);
    //},
    easeInElastic   : function (t) {
      if (t == 0 || t == 1) {
        return t;
      }
      var p = 0.3;
      var s = p / 4;
      return -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p);
    },
    easeOutElastic  : function (t) {
      if (t == 0 || t == 1) {
        return t;
      }
      var p = 0.3;
      var s = p / 4;
      return Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },
    easeInOutElastic: function (t) {
      if (t == 0 || t == 1) {
        return t;
      }
      t     = t * 2;
      var p = 0.3 * 1.5;
      var s = p / 4;

      if (t < 1) {
        return -.5 * (Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
      }
      return Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * .5 + 1;

    },
    easeInBack      : function (t) {
      var s = 1.70158;
      return t * t * ((s + 1) * t - s);
    },
    easeOutBack     : function (t) {
      var s = 1.70158;
      return ((t = t - 1) * t * ((s + 1) * t + s) + 1);
    },
    easeInOutBack   : function (t) {
      var s = 1.70158;
      if ((t *= 2) < 1) {
        return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
      }
      return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
    },
    easeOutBounce   : function (t) {
      if ((t) < (1 / 2.75)) {
        return (7.5625 * t * t);
      } else if (t < (2 / 2.75)) {
        return (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
      } else if (t < (2.5 / 2.75)) {
        return (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
      } else {
        return (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
      }
    }
    //easeInBounce    : function (t) {
    //  return 1 - CONST.EASINGS.easeOutBounce(t);
    //},
    //easeInOutBounce : function (t) {
    //  //if (t < d / 2) {
    //  //  return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
    //  //}
    //  //return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    //}
  }
};

module.exports = CONST;
},{}],11:[function(require,module,exports){
/**
 * 键盘事件管理器, 此类已经混合进 UIObject, 可以直接在 UIObject 示例上进行调用
 * @mixin
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

},{}],12:[function(require,module,exports){
(function (global){
var tivy = module.exports = {
  CONST          : require('./const'),
  UIObject       : require('./UIObject'),
  UIObjectGroup  : require('./UIObjectGroup'),
  Stage          : require('./Stage'),
  Button         : require('./basic/Button'),
  Tile           : require('./basic/Tile'),
  ImageFrame     : require('./basic/ImageFrame'),
  Metro          : require('./components/Metro'),
  KeyboardManager: require('./events/KeyboardManager'),
  Animal         : require('./animation/Animal'),
  AnimalManager  : require('./animation/AnimalManager'),
};

//mixin tow class
Object.assign(
  tivy.UIObject.prototype,
  tivy.KeyboardManager.prototype
);


global.Tivy = tivy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Stage":1,"./UIObject":2,"./UIObjectGroup":3,"./animation/Animal":4,"./animation/AnimalManager":5,"./basic/Button":6,"./basic/ImageFrame":7,"./basic/Tile":8,"./components/Metro":9,"./const":10,"./events/KeyboardManager":11}]},{},[12])(12)
});


//# sourceMappingURL=tivy.js.map
