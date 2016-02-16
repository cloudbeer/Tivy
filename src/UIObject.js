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
  this.stage.addChild(this);
}

UIObject.prototype             = Object.create(PIXI.Container.prototype);
UIObject.prototype.constructor = UIObject;
module.exports                 = UIObject;