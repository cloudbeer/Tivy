function Poster(options) {
  PIXI.Container.call(this);
  if (!options) {
    options = {};
  }

  this.stage = options.stage;
  if (!this.stage) {
    throw new Error('stage is null');
  }
  this.placeHolderTexture = options.placeHolderTexture;
  if (!this.placeHolderTexture) {
    throw new Error('placeHolderTexture is null');
  }

  this.stage.addChild(this);

  this.size          = options.size || {w: 300, h: 400};
  this.position      = options.position || {x: 0, y: 0};
  this.textColor     = options.textColor || 0x7f7f7f;
  this.textBgColor   = options.textBgColor || 0xffffff;
  this.textHeight    = options.textHeight || 50;
  this.font          = options.font || '25px 迷你简准圆';
  this.text          = options.text;
  this.imageUrl      = options.imageUrl;
  this.isWithText    = options.isWithText || false;
  this.radius        = options.radius || 15;
  this.width         = this.size.w;
  this.height        = this.size.h;
  this.posterTexture = null;
  this.imageSprite   = null;
  this.textLabel     = null;
  this.imageSetted   = false;

  this.paint();
}

Poster.prototype             = Object.create(PIXI.Container.prototype);
Poster.prototype.constructor = Poster;
module.exports               = Poster;

Poster.prototype.paint = function () {
  if (this.radius) {
    var mask = new PIXI.Graphics();
    mask.lineStyle(0);
    mask.beginFill(0xffffff);
    mask.drawRoundedRect(0, 0, this.size.w, this.size.h, this.radius);
    mask.endFill();
    this.addChild(mask);
    this.mask = mask;
  }

  //背景
  var g = new PIXI.Graphics();
  g.lineStyle(0);
  g.beginFill(this.textBgColor, .5);
  if (this.isWithText && this.text) {
    g.drawRect(0, 0, this.size.w, this.size.h - this.textHeight);

    //文字背景
    g.beginFill(this.textBgColor, .7);
    g.drawRect(0, this.size.h - 50, this.size.w, this.textHeight);

    this.textLabel = new PIXI.Text(this.text, {
      font: this.font,
      fill: this.textColor
    });

    this.textLabel.y = this.size.h - this.textHeight + (this.textHeight - this.textLabel.height) / 2;
    if (this.textLabel.width > this.size.w) {
      this.textLabel.x = 10;
    } else {
      this.textLabel.x = (this.size.w - this.textLabel.width) / 2;
    }

    g.addChild(this.textLabel);
  }
  else {
    g.drawRect(0, 0, this.size.w, this.size.h);
  }
  g.endFill();
  this.addChild(g);

  this.imageSprite        = new PIXI.Sprite(this.placeHolderTexture);
  this.imageSprite.width  = this.size.w;
  this.imageSprite.height = this.isWithText ? this.size.h - this.textHeight : this.size.h;

  if (this.imageUrl){
    this.setContent(this.imageUrl);
  }

  this.addChild(this.imageSprite);

  this.stage.repaint();

};

Poster.prototype.setContent = function (imgUrl, text) {
  if (imgUrl) {
    imgUrl                   = imgUrl + '?t=' + (new Date()) * 1;
    this.posterTexture       = PIXI.Texture.fromImage(imgUrl);
    this.imageSprite.texture = this.posterTexture;
    var _stage               = this.stage;
    this.posterTexture.baseTexture.on('loaded', function () {
      _stage.repaint();
    });
  }

  if (this.isWithText && text) {
    this.textLabel.text = text;
    if (this.textLabel.width > this.size.w) {
      this.textLabel.x = 10;
    } else {
      this.textLabel.x = (this.size.w - this.textLabel.width) / 2;
    }
  }
  this.text         = text;
  this.posterSetted = true;
};
