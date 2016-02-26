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
