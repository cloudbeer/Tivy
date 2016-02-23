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
   * @property {object} KEY_CODES - 键盘的按键值
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
   */
  EASINGS  : {
    linear: function (t) {
      return t;
    },
    swing : function (t) {
      return 0.5 - Math.cos(t * Math.PI) / 2;
    },

    easeInQuad    : function (t) {
      return t * t
    },
    // decelerating to zero velocity
    easeOutQuad   : function (t) {
      return t * (2 - t)
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad : function (t) {
      return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    // accelerating from zero velocity
    easeInCubic   : function (t) {
      return t * t * t
    },
    // decelerating to zero velocity
    easeOutCubic  : function (t) {
      return (--t) * t * t + 1
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function (t) {
      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    // accelerating from zero velocity
    easeInQuart   : function (t) {
      return t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuart  : function (t) {
      return 1 - (--t) * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) {
      return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    // accelerating from zero velocity
    easeInQuint   : function (t) {
      return t * t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuint  : function (t) {
      return 1 + (--t) * t * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function (t) {
      return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
  }
};

module.exports = CONST;