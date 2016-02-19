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
