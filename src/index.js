var tivy = module.exports = {
  UIObject: require('./UIObject'),
  Stage: require('./Stage'),
  Button: require('./basic/Button'),
  Tile: require('./basic/Tile'),
  ImageFrame: require('./basic/ImageFrame'),
  Poster: require('./components/Poster'),
  Metro: require('./components/Metro'),
};

global.Tivy = tivy;