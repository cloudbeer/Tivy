var EASINGS = require('../const').EASINGS;

/**
 * 一个动画, 这个单词是我故意写错的
 * An animation, this is a wrong word, it is cool!
 *
 * 动画参考了这个 {@link http://javascript.info/tutorial/animation}
 *
 * @class
 * @memberof Tivy
 * @param {json} options - 动画配置
 * @param {Object} options.target - 这个是一个函数,指定 target 的属性
 * @param {string} options.property - 需要变化的物件的属性, 如 'x'
 * @param {number} options.to - 结束的值
 * @param {number} [options.duration=1000] - 运行动画的总时间, 单位 ms
 * @param {function} [options.easing=Tivy.CONST.EASINGS.linear] - 缓动函数,计算属性变化. 默认参考 {@link Tivy.CONST}
 * @param {function} [options.step] - 这个是一个函数, 用于指定 target 的属性
 * @param {number} [options.from] - 开始的值, 如果不指定, 就是动画开始前物体的该属性值
 */
function Animal(options) {
  this.target   = options.target;
  this.property = options.property;
  this.duration = options.duration || 1000;
  this.easing   = options.easing || EASINGS.linear;
  this.step     = options.step;
  this.from     = options.from;
  this.to       = options.to;


  this.tag      = null;
  this.reserve  = false;
  this.finished = false;

  this._start = new Date;

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