var UIObject = require('../UIObject');

function Slider() {
  if (!options) {
    options = {};
  }
  this.size = options.size = options.size || {width: 200, height: 200};
  UIObject.call(this, options);

}

Slider.prototype             = Object.create(UIObject.prototype);
Slider.prototype.constructor = Slider;
module.exports               = Slider;
