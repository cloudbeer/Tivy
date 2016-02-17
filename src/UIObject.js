/**
 * This is a base class which can be placed to {@link Tivy.Stage}
 * 这个是可以放置到舞台上的基类.
 *
 * @class
 * @memberof Tivy
 * @param options {json} - 构造参数, 必须有 stage 参数
 * @constructor
 * @extends PIXI.Container
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
  if (this.size && this.size.w > 0 && this.size.h > 0) {
    this.width  = this.size.w;
    this.height = this.size.h;
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

UIObject.prototype.bringToFront = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
  }
};


UIObject.prototype.sendToBack = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChildAt(this, 0);
  }
};