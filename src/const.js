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
        return -.5 * (Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p))
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