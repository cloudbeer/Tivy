/**
 * 静态值
 * Constant values used in pixi
 *
 * @lends Tivy
 */
var CONST = {
  /**
   * 键盘的键值, 定义了通用遥控器的主要键
   * Main keycode of remoter
   *
   * @static
   * @constant
   * @property {object} KEY_CODES
   * @property {number} KEY_CODES.ENTER=13
   * @property {number} KEY_CODES.ESC=27
   * @property {number} KEY_CODES.LEFT=37
   * @property {number} KEY_CODES.UP=38
   * @property {number} KEY_CODES.RIGHT=39
   * @property {number} KEY_CODES.DOWN=40
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

};

module.exports = CONST;