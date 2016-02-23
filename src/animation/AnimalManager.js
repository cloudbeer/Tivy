var Animal = require('./Animal');
var CONST  = require('../const');

/**
 * 动画管理器
 * @param options {json} 配置
 * @constructor
 * @memberof Tivy
 */
function AnimalManager(options) {
  /**
   * @readonly
   */
  this.stage = options.stage;
  this.duration = options.duration;
  this.fps      = options.fps || 60;

  this.delay = 1000 / this.fps;
  /**
   * 动画数组
   * @member {Tivy.Animal}
   */
  this.animals = [];

  /**
   * 一个 stage 启动一个 线程刷新
   * @member {Array}
   */
  this.stages = [];

}

AnimalManager.prototype.constructor = AnimalManager;
module.exports                      = AnimalManager;

/**
 * 寻找动画
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
 * 找到绘制舞台
 * @param _target
 * @returns {*}
 */
AnimalManager.prototype.findStage = function (_target) {
  var stages = this.animals.filter(function (ele) {
    return ele.target.stage === _target.stage;
  });
  if (stages.length > 0) {
    return stages[0];
  }
  return null;
};


/**
 * 增加一个动画物件
 * @param _target {object}
 * @param _property {string}
 * @param _from {number}
 * @param _to {number}
 */
AnimalManager.prototype.addTarget = function (_target, _property, _from, _to) {
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
  animal.from     = _from;
  animal.to       = _to;
  animal.step     = function (delta) {
    _target[_property] = _from + (_to - _from) * delta;
  };
  animal.easing   = avs._easing || CONST.EASINGS.linear;
  animal.duration = avs._duration || this.duration;
  animal.delay    = 1000 / this.fps;
  animal.reserve  = avs._reserve;
  animal.tag      = avs._tag;
};

/**
 * 运行动画
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

/**
 * 解析动画参数
 * @param v1
 * @param v2
 * @param v3
 * @param v4
 * @returns {{}}
 */
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
