var Animal = require('./Animal');
var CONST  = require('../CONST');

/**
 * 动画管理器
 * @param options {json} 配置
 * @constructor
 */
function AnimalManager(options) {
  this.duration = options.duration;
  this.animals  = [];
}

AnimalManager.prototype.constructor = AnimalManager;
module.exports                      = AnimalManager;


/**
 * 增加一个动画物件
 * @param _target
 * @param _proporty
 * @param _from
 * @param _to
 */
AnimalManager.prototype.addTarget = function (_target, _proporty, _from, _to) {
  var av3 = arguments[3];
  var av4 = arguments[4];
  var av5 = arguments[5];
  var av6 = arguments[6];
  var avs = this.parseArg(av3, av4, av5, av6);

  var animal = new Animal({
    target  : _target,
    property: _proporty,
    from    : _from,
    to      : _to,
    delta   : avs._delta || CONST.DELTAS.linear,
    duration: avs._duration,
    reserve : avs._reserve,
    tag     : avs._tag
  });
  this.animals.push(animal);

};

AnimalManager.prototype.runAnimals = function () {
  this.animals.forEach(function (ele, index) {
    ///这里开始运行
  });
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
    rtn._delta = v1;
  } else if (t2 === 'function') {
    rtn._delta = v2;
  } else if (t3 === 'function') {
    rtn._delta = v3;
  } else if (t4 === 'function') {
    rtn._delta = v4;
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
