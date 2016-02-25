/**
 * This is a base class which can be placed to {@link Tivy.Stage}
 * 这个是可以放置到舞台上的基类.
 *
 * @class
 * @memberof Tivy
 * @extends PIXI.Container
 * @param {Object} options  - json 格式的参数
 * @param {Tivy.Stage} options.stage  - 舞台, 这个参数必须设置
 * @param {PIXI.DisplayObject} options.owner  - 当前物体的父容器
 * @param {{x:number, y:number}} options.position={x:0,y:0} - 位置
 * @param {{width:number, height:number}} options.size - 大小
 */
function UIObject(options) {
  PIXI.Container.call(this);
  if (!options) {
    options = {};
  }

  this.stage = options.stage;
  if (!this.stage) {
    throw new Error('A stage is required.');
  }
  this.owner    = options.owner;
  this.position = options.position || {x: 0, y: 0};
  this.size     = options.size;
  if (this.size && this.size.width > 0 && this.size.height > 0) {
    this.width  = this.size.width;
    this.height = this.size.height;
  }
  if (this.owner) {
    this.owner.addChild(this);
  } else {
    this.stage.addChild(this);
  }
}

UIObject.prototype             = Object.create(PIXI.Container.prototype);
UIObject.prototype.constructor = UIObject;
module.exports                 = UIObject;

/**
 * 将这个置于顶部
 */
UIObject.prototype.bringToFront = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
  }
};

/**
 * 将这个置于底部
 */
UIObject.prototype.sendToBack = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChildAt(this, 0);
  }
};