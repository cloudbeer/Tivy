/**
 * 一个动画, 这个单词是我故意写错的
 * An animation, this is a wrong word, it is cool!
 *
 * 动画参考了这个 {@link http://javascript.info/tutorial/animation}
 *
 * @class
 * @memberof Tivy
 * @param options {json} 动画配置
 */
function Animal(options) {

  /**
   * 这个是一个函数,指定 target 的属性
   * @member {object}
   */
  this.target = options.target;
  /**
   * 需要变化的物件的属性
   * @member {string}
   */
  this.property = options.property;

  //this.tweeners = [];


  ///**
  // * 运行动画的间隔时间, 单位 ms, 默认 16 （~=60fps）
  // * @member {number}
  // */
  //this.delay = options.delay || 16;

  /**
   * 运行动画的总时间, 单位 ms
   * @member {number}
   */
  this.duration = options.duration;
  /**
   * 这是一个函数,计算坐标变化
   * @member {function}
   */
  this.easing = options.easing;

  /**
   * 这个是一个函数,指定 target 的属性
   * @member {function}
   */
  this.step = options.step;
  this.from = options.from;
  this.to   = options.to;


  this.tag      = null;
  this.reserve  = false;
  this.finished = false;

  this._start = new Date;


  //this.start      = new Date;
  //this.timePassed = 0;
  //this.progress   = 0;

}


Animal.prototype.constructor = Animal;
module.exports               = Animal;


//Object.defineProperties(Animal.prototype, {
//  property:{
//    get: function(){
//      return this.property;
//    }
//  }
//
//});