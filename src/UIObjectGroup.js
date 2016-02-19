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
   * 这是控件的装载容器, 新建子控件的时候,需要指定 owner 为 这个 container. 创建这个控件的目的也是为了滑动整个内容
   * @readonly
   */
  this.container = new PIXI.Container();
  this.addChild(this.container);

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

/**
 * 给控件附加事件
 * @param uiObject {Object} 子元素控件, 在初始化元素之后附加事件
 * @example
 *
 var tile = new Tile({
      stage             : _this.stage,
      owner             : someGoupContainer,
      size              : {width: ele.width, height: ele.height},
      position          : {x: ele.x, y: ele.y},
      placeHolderTexture: _this.layout.placeHolderTexture,
      radius            : 10,
      data              : somedata
    });
 someGoupContainer.attachEvent(tile);
 *
 */
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
    var oldIndex         = _this.currentIndex;
    var oldCtr           = _this.currentControl;
    _this.currentIndex   = i;
    _this.currentControl = this;
    _this.emit('focus', this, i);
    if (oldIndex !== i) {
      _this.emit('change', this, i, oldCtr, oldIndex);
    }
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

/**
 * 当控件组重新被聚焦的时候, 触发 change 事件
 */
UIObjectGroup.prototype.activate = function () {
  if (this.isActive) {
    return;
  }
  UIObject.prototype.activate.call(this);

  if (this.currentIndex < 0) {
    this.currentIndex   = 0;
    this.currentControl = this.controls[0];
  }
  this.emit('change', this.currentControl, this.currentIndex, null, -1);

};