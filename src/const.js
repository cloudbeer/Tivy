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
   * 系统内置的 delta 动画函数
   *
   * @property {function} linear - 线性动画
   * @property {function} quadrantic - 抛物线（平方）
   * @property {function} circ - circ
   * @property {function} back - back
   * @property {function} bounce - bounce
   * @property {function} elastic - elastic
   */
  DELTAS   : {
    linear    : function (progress) {
      return progress;
    },
    quadrantic: function (progress) {
      return Math.pow(progress, 2);
    },
    circ      : function (progress) {
      return 1 - Math.sin(Math.acos(progress));
    },
    back      : function (progress) {
      return Math.pow(progress,2)*((1.5+ 1)*progress- 1.5)
    },
    bounce    : function (progress) {
      for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (progress >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
        }
      }
    },
    elastic   : function (progress) {
      return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * progress);
    }

  }
};

module.exports = CONST;