/**
 * A Stage represents a canvas and an empty PIXI DisplayObject.
 * You can add child into stage directly.
 * And it can be repainted alone.
 *
 * ```js
 * var stage = new Tivy.Stage({
   *  id: 'stage01', //The canvas id
   *  size:{width:500, height:400}, //Size of the stage, w is width, h is heigt
   *  position:{x:0, y:0}, //Position of the stage
   *  background: '#ccc', //Backgound of the canvas, it is a css style.
   *  zIndex: 10 //z-index of the canvas, it is a css style.
   * });
 * ```
 *
 * @class
 * @memberof Tivy
 * @param options {json} - config json object.
 * @constructor
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
  _stage.width  = this.size.width;
  _stage.height = this.size.height;

  this.render = new PIXI.WebGLRenderer(this.size.width, this.size.height, {
    transparent: true,
    view: canvas,
    //antialias: true,
    forceFXAA: true
  });

  _stage.id      = this.id;
  _stage.isStage = true;

  this._stage = _stage;

};

Stage.prototype = {
  /**
   * Show the stage.
   */
  show: function () {
    this.renderable = true;
    this.repaint();
  },
  /**
   * Hide the stage.
   */
  hide: function () {
    this.renderable = false;
    this.repaint();
  },

  /**
   *
   * @param uiObject {PIXI.DisplayObject} The object to repaint. if it is null, repaint this stage.
   */
  repaint: function (uiObject) {
    if (uiObject) {
      this.render.render(uiObject);
    } else {
      this.render.render(this._stage);
    }
  },

  /**
   *
   * @param uiObject {PIXI.DisplayObject} The object to add.
   */
  addChild: function (uiObject) {
    this._stage.addChild(uiObject);
  },

  removeChild: function (uiObject) {
    this._stage.removeChild(uiObject);
  }

};

module.exports = Stage;
