/**
 * 舞台包含了一个 html 的 canvas, 一个 空的 PIXI Container.
 * 创建之后, 这个舞台就已经画到了网页中.
 * 网页中可以添加多个舞台, 以实现独立渲染.
 *
 * A Stage represents a canvas and an empty PIXI Container.
 * You can add child into stage directly.
 * And it can be repainted alone.
 *
 * @example
 * var stage = new Tivy.Stage({
 *  id: 'stage01', //The canvas id
 *  size:{width:500, height:400}, //Size of the stage, w is width, h is heigt
 *  position:{x:0, y:0}, //Position of the stage
 *  background: '#ccc', //Backgound of the canvas, it is a css style.
 *  zIndex: 10 //z-index of the canvas, it is a css style.
 * });
 *
 *
 * @class
 * @memberof Tivy
 * @param {json} options - config json object.
 * @param {string} options.id - 此舞台的 id, 渲染之后 canvas 的 id 也是这个.
 * @param {{x:number, y:number}} options.position={x:0,y:0} - 位置
 * @param {{width:number, height:number}} options.size={width:1920,height:1080} - 大小
 * @param {string} options.background - 画布的背景（这是一个 css 属性）
 * @param {number} options.zIndex - 画布的层级 （这是一个 css 属性）
 *
 */
var Stage = function (options) {
  if (!options) {
    options = {};
  }
  this.id         = options.id || 'stage_' + new Date() * 1;
  this.position   = options.position || {x: 0, y: 0};
  this.size       = options.size || {width: 1920, height: 1080};
  this.background = options.background;
  this.zIndex     = options.zIndex || 0;

  if (document.getElementById(this.id)) {
    throw new Error('Stage id is dumplicate');
  }


  this.width  = this.size.width;
  this.height = this.size.height;

  var canvas              = document.createElement('canvas');
  canvas.id               = this.id;
  canvas.style.position   = 'absolute';
  canvas.style.top        = this.position.y;
  canvas.style.left       = this.position.x;
  canvas.style.zIndex     = this.zIndex;
  canvas.style.background = this.background;

  document.body.appendChild(canvas);

  var _stage = new PIXI.Container();
  //_stage.screenX = this.position.x;
  //_stage.screenY = this.position.y;
  //_stage.width  = this.size.width;
  //_stage.height = this.size.height;

  this.render = new PIXI.WebGLRenderer(this.size.width, this.size.height, {
    transparent: true,
    view       : canvas,
    //antialias: true,
    forceFXAA  : true
  });

  _stage.id      = this.id;
  _stage.isStage = true;

  this._stage = _stage;

};

Stage.prototype = {
  /**
   * 显示舞台
   * Show the stage.
   */
  show: function () {
    this.renderable = true;
    this.repaint();
  },
  /**
   * 隐藏舞台
   * Hide the stage.
   */
  hide: function () {
    this.renderable = false;
    this.repaint();
  },

  /**
   * 重绘
   * @param {PIXI.DisplayObject} uiObject  - The object to repaint. if it is null, repaint this stage.
   */
  repaint: function (uiObject) {
    if (uiObject) {
      this.render.render(uiObject);
    } else {
      this.render.render(this._stage);
    }
  },

  /**
   * 增加子节点
   * @param  {PIXI.DisplayObject} uiObject - The object to add.
   */
  addChild: function (uiObject) {
    this._stage.addChild(uiObject);
  },

  removeChild: function (uiObject) {
    this._stage.removeChild(uiObject);
  }

};

module.exports = Stage;
