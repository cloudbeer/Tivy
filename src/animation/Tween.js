var CONST = require('../CONST');

function Tween(options) {
  this.prop     = options.prop;
  this.from     = options.from;
  this.to       = options.to;
  this.easing   = options.easing || CONST.EASINGS.linear;
  this.duration = options.duration || 1000;
  this.step     = options.step || function (delta) {
      _target[_property] = _from + (_to - _from) * delta;

    };
}
Tween.prototype.constructor = Tween;
module.exports              = Tween;