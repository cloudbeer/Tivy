var tivy = module.exports = {
  UIObject       : require('./UIObject'),
  Stage          : require('./Stage'),
  Button         : require('./basic/Button'),
  Tile           : require('./basic/Tile'),
  ImageFrame     : require('./basic/ImageFrame'),
  Poster         : require('./components/Poster'),
  Metro          : require('./components/Metro'),
  KeyboardManager: require('./events/KeyboardManager'),
};

Object.assign(
  tivy.UIObject.prototype,
  tivy.KeyboardManager.prototype
);


global.Tivy = tivy;
