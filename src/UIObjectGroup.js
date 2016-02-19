var UIObject = require('./UIObject');

/**
 * 描述了一个控件组, 并绑定了事件
 *
 * @class
 * @param options {json} 配置节点
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
  uiObject.on('keydown', function () {
    console.log('keydown');
  });

  uiObject.on('touchstart', function () {
    _this.currentIndex   = i;
    _this.currentControl = this;
    _this.emit('focus', this, i);
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

};