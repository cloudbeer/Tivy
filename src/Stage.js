/**
 * A Stage represents a canvas and an empty PIXI DisplayObject.
 * You can add child into stage directly.
 * And it can be repainted alone.
 *
 * ```js
 * var stage = new Tivy.Stage({
   *  id: 'stage01', //The canvas id
   *  size:{w:500, h:400}, //Size of the stage, w is width, h is heigt
   *  position:{x:0, y:0}, //Position of the stage
   *  background: '#ccc', //Backgound of the canvas, it is a css style.
   *  zIndex: 10 //z-index of the canvas, it is a css style.
   * });
 * ```
 *
 * @class
 * @memberof Tivy
 * @param options {json} config json object.
 * @constructor
 */
var Stage = function (options) {
  if (!options) {
    options = {};
  }
  this.id         = options.id || 'stage_' + new Date() * 1;
  this.position   = options.position || {x: 0, y: 0};
  this.size       = options.size || {w: 1920, h: 1080};
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
  _stage.width  = this.size.w;
  _stage.height = this.size.h;

  this.render = new PIXI.WebGLRenderer(this.size.w, this.size.h, {
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
  }

};

//module.prototype.constructor = Stage;
module.exports               = Stage;

//
//var Stage = module.exports = {
//  /**
//   * It is the static method to create an instance of Stage.
//   *
//   * ```js
//   * var stage = Stage.create({
//   *  id: 'stage01', //The canvas id
//   *  size:{w:500, h:400}, //Size of the stage, w is width, h is heigt
//   *  position:{x:0, y:0}, //Position of the stage
//   *  background: '#ccc', //backgound of the canvas, it can be html style format.
//   *  zIndex: 10 //z-index of the canvas.
//   * });
//   * ```
//   *
//   * @param options {json} An config json node
//   * @returns {PIXI.Container} The container that was created.
//   */
//  create: function (options) {
//    if (!options) {
//      options = {};
//    }
//    var id         = options.id || "stage_" + new Date() * 1;
//    var position   = options.position || {x: 0, y: 0};
//    var size       = options.size || {w: 1920, h: 1080};
//    var background = options.background;
//    var zIndex     = options.zIndex || 0;
//
//    //if (!id) {
//    //  throw new Error('You must the define stage id');
//    //}
//    if (document.getElementById(id)) {
//      throw new Error('Stage id is dumplicate');
//    }
//
//
//    var canvas              = document.createElement('canvas');
//    canvas.id               = id;
//    canvas.style.position   = 'absolute';
//    canvas.style.top        = position.y;
//    canvas.style.left       = position.x;
//    canvas.style.zIndex     = zIndex;
//    canvas.style.background = background;
//
//    document.body.appendChild(canvas);
//
//    var _stage     = new PIXI.Container();
//    _stage.screenX = position.x;
//    _stage.screenY = position.y;
//    _stage.width   = size.w;
//    _stage.height  = size.h;
//
//    var render = new PIXI.WebGLRenderer(size.w, size.h, {
//      transparent: true,
//      view: canvas,
//      //antialias: true,
//      forceFXAA: true
//    });
//
//    _stage.id      = id;
//    _stage.isStage = true;
//
//    _stage.repaint = function (object) {
//      if (object) {
//        render.render(object);
//      } else {
//        render.render(this);
//      }
//    };
//
//    _stage.addContent = function (uiObject) {
//      uiObject.setOwner(this);
//      this.addChild(uiObject);
//    };
//
//    _stage.hide = function () {
//      this.renderable = false;
//      this.repaint();
//    };
//
//    _stage.show = function () {
//      this.renderable = true;
//      this.repaint();
//    };
//    return _stage;
//  }
//};
