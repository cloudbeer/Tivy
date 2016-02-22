var tivy = module.exports = {
  CONST       : require('./const'),
  UIObject       : require('./UIObject'),
  UIObjectGroup  : require('./UIObjectGroup'),
  Stage          : require('./Stage'),
  Button         : require('./basic/Button'),
  Tile           : require('./basic/Tile'),
  ImageFrame     : require('./basic/ImageFrame'),
  Poster         : require('./components/Poster'),
  Metro          : require('./components/Metro'),
  KeyboardManager: require('./events/KeyboardManager'),
};

//mixin tow class
Object.assign(
  tivy.UIObject.prototype,
  tivy.KeyboardManager.prototype
);


global.Tivy = tivy;
