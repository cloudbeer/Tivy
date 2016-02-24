var UIObjectGroup = require('../UIObjectGroup');
var Tile          = require('../basic/Tile');
var KEY_CODES     = require('../const').KEY_CODES;

/**
 * Metro 是一组自定义位置 tile 的组合
 *
 * @example
 var xTexture = PIXI.Texture.fromImage('./assets/img/place-holder.png');

 var layout = {
    placeHolderTexture: xTexture,
    radius: 20,
    tiles: [
      {
        x: 0, y: 0, width: 200, height: 200,
        showText: false,
        radius: 0
      },
      {
        x: 0, y: 210, width: 200, height: 200,
        showText: false,
        radius: 0
      },
      {
        x: 0, y: 420, width: 200, height: 200,
        showText: false,
        radius: 0
      },
      {
        x: 210, y: 0, width: 400, height: 620,
        showText: false
      },
      {
        x: 620, y: 0, width: 500, height: 305,
        showText: false,
        radius: 0
      },
      {
        x: 620, y: 315, width: 500, height: 305,
        showText: false,
        radius: 0
      },
      {
        x: 1130, y: 0, width: 410, height: 410,
        showText: false,
        radius: 10
      },
      {
        x: 1130, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      },
      {
        x: 1340, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      },
      {
        x: 1550, y: 0, width: 500, height: 305,
        showText: false,
        radius: 10
      },
      {
        x: 1550, y: 315, width: 500, height: 305,
        showText: false,
        radius: 10
      },
      {
        x: 2060, y: 0, width: 410, height: 410,
        showText: false,
        radius: 10
      },
      {
        x: 2060, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      },
      {
        x: 2270, y: 420, width: 200, height: 200,
        showText: false,
        radius: 10
      }
    ]
  };
 var data   = [
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正0'
 },
 {
   imageUrl: './assets/img/200X200.jpg',
   text: '小正1'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正2'
 },
 {
   imageUrl: './assets/img/400X620-1.jpeg',
   text: '大长3'
 },
 {
   imageUrl: './assets/img/500X305-1.jpg',
   text: '中横4'
 },
 {
   imageUrl: './assets/img/500X305-2.jpg',
   text: '中横5'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正6'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正7'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正8'
 },
 {
   imageUrl: './assets/img/500X305-1.jpg',
   text: '中横9'
 },
 {
   imageUrl: './assets/img/500X305-2.jpg',
   text: '中横10'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正11'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正12'
 },
 {
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正13'
 },

 ];


 var stage = new Tivy.Stage({
    background: '#000',
    id: 'stage01',
    //size: {width: $(document.body).width(), height: $(document.body).height()}
    size: {width: 1920, height: 1080}
  });

 xTexture.baseTexture.on('loaded', function () {
    var metro = new Tivy.Metro({
      position: {x: 100, y: 200},
      stage: stage,
      layout: layout
    });

    metro.bindData(data);


    metro.onTileOver = function (target, index) {
      var oriH     = target.height,
          oriW     = target.width;
      target.scale = {x: 1.2, y: 1.2};
      target.x     = target.x + (oriW - target.width) / 2;
      target.y     = target.y + (oriH - target.height) / 2;
      target.bringToFront();
      stage.repaint();
    };

    metro.onTileOut = function (target, index) {
      var oriH     = target.height,
          oriW     = target.width;
      target.scale = {x: 1, y: 1};
      target.x     = target.x + (oriW - target.width) / 2;
      target.y     = target.y + (oriH - target.height) / 2;
      target.sendToBack();
      stage.repaint();
    };

    metro.onTileExecute = function (target, index) {
      console.log('execute', target.text);
    }

  });

 *
 *
 *
 * @class
 * @param options {json} Metro config
 * @constructor
 * @memberof Tivy
 * @extends {Tivy.UIObjectGroup}
 */
function Metro(options) {
  if (!options) {
    options = {};
  }
  UIObjectGroup.call(this, options);

  this.layout = options.layout;
  if (!this.layout) {
    throw new Error('layout is null');
  }
  this._init();

}


Metro.prototype             = Object.create(UIObjectGroup.prototype);
Metro.prototype.constructor = Metro;
module.exports              = Metro;


/**
 * 初始化
 *
 * @private
 */
Metro.prototype._init = function () {
  //Draw layout
  var _this = this;
  this.layout.tiles.forEach(function (ele, i) {
    var tile      = new Tile({
      stage             : _this.stage,
      owner             : _this.container,
      size              : {width: ele.width, height: ele.height},
      position          : {x: ele.x, y: ele.y},
      placeHolderTexture: _this.layout.placeHolderTexture,
      radius            : ele.radius == null ? _this.layout.radius : ele.radius,
      data              : ele.data,
      myIndex           : i
    });
    tile.myLayout = ele;
    _this.attachEvent(tile);
  });

  this.on('keydown', function (evt) {
    var _this    = this;
    var oldCtr   = this.currentControl;
    var oldIndex = this.currentIndex;
    var mearContrl;
    switch (evt.which) {
      case KEY_CODES.ENTER:
        this.emit('execute', this.currentControl, this.currentIndex);
        break;
      case KEY_CODES.RIGHT:
        var myRightControls = this.controls.filter(function (ele) {
          return ele.myLayout.x > oldCtr.myLayout.x //左边要大
            && ele.myLayout.x + ele.myLayout.width > oldCtr.myLayout.x + oldCtr.myLayout.width //右边也大
            && ele.myLayout.y + ele.myLayout.height > oldCtr.myLayout.y //不能完全在上面
            && ele.myLayout.y < oldCtr.myLayout.y + oldCtr.myLayout.height; //不能完全在下面
        });

        if (myRightControls.length > 0) {
          mearContrl          = myRightControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
      case KEY_CODES.LEFT:
        var myLeftControls = this.controls.filter(function (ele) {
          return ele.myLayout.x < oldCtr.myLayout.x
            && ele.myLayout.x + ele.myLayout.width < oldCtr.myLayout.x + oldCtr.myLayout.width //右边也大
            && ele.myLayout.y + ele.myLayout.height > oldCtr.myLayout.y //不能完全在上面
            && ele.myLayout.y < oldCtr.myLayout.y + oldCtr.myLayout.height; //不能完全在下面
        });
        if (myLeftControls.length > 0) {
          mearContrl          = myLeftControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        this.currentControl = this.controls[this.currentIndex];
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
      case KEY_CODES.UP:
        var myUpControls = this.controls.filter(function (ele) {
          return ele.myLayout.y < oldCtr.myLayout.y
            && ele.myLayout.y + ele.myLayout.height < oldCtr.myLayout.y + oldCtr.myLayout.height
            && ele.myLayout.x + ele.myLayout.width > oldCtr.myLayout.x //不能完全在左边面
            && ele.myLayout.x < oldCtr.myLayout.x + oldCtr.myLayout.width; //不能完全在右边
        });
        if (myUpControls.length > 0) {
          mearContrl          = myUpControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        this.currentControl = this.controls[this.currentIndex];
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
      case KEY_CODES.DOWN:
        var myDownControls = this.controls.filter(function (ele) {
          return ele.myLayout.y > oldCtr.myLayout.y
            && ele.myLayout.y + ele.myLayout.height > oldCtr.myLayout.y + oldCtr.myLayout.height
            && ele.myLayout.x + ele.myLayout.width > oldCtr.myLayout.x //不能完全在左边面
            && ele.myLayout.x < oldCtr.myLayout.x + oldCtr.myLayout.width; //不能完全在右边
        });
        if (myDownControls.length > 0) {
          mearContrl          = myDownControls.reduce(function (a, b) {
            var disAX = Math.abs(a.myLayout.x - oldCtr.x);
            var disAY = Math.abs(a.myLayout.y - oldCtr.y);
            var disBX = Math.abs(b.myLayout.x - oldCtr.x);
            var disBY = Math.abs(b.myLayout.y - oldCtr.y);
            var disA  = Math.sqrt(disAX * disAX + disAY * disAY);
            var disB  = Math.sqrt(disBX * disBX + disBY * disBY);
            return disA < disB ? a : b;
          });
          this.currentIndex   = mearContrl.myIndex;
          this.currentControl = mearContrl;
        }
        this.currentControl = this.controls[this.currentIndex];
        if (this.currentIndex !== oldIndex) {
          this.emit('change', this.currentControl, this.currentIndex, oldCtr, oldIndex);
        }
        break;
    }
  });

};

/**
 * 绑定数据
 *
 * @param newData {json} 绑定的数据, 格式如下:
 * @example
 *  [{
   imageUrl: './assets/img/200X200-1.jpg',
   text: '小正0',
   data: 'anything'
 },
 {
   imageUrl: './assets/img/200X200.jpg',
   text: '小正1',
   data: 'anything'
 }]
 *
 */
Metro.prototype.bindData = function (newData) {
  var _this = this;
  newData.forEach(function (ele, i) {
    _this.controls[i].setContent(ele.imageUrl, ele.text, ele.data);
  });
};

