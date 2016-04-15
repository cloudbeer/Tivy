var UIObject = require('./UIObject');

function Panel(options) {
  if (!options) {
    options = {};
  }
  this.size = options.size = options.size || {width: 300, height: 400};
  this.title           = options.title;
  this.titleBackground = options.titleBackground;
  this.titleColor      = options.titleColor;
  this.titleHeight     = options.titleHeight;

  UIObject.call(this, options);
}


Metro.prototype             = Object.create(Panel.prototype);
Metro.prototype.constructor = Panel;
module.exports              = Panel;

Panel.prototype._init = function () {

};


Panel.prototype.addChild = function (uiObject) {
};
