var UIObject = require('./UIObject');
/***
 *
 * @au huangxing
 *
 * @date 2016 - 2- 15
 *
 * button  的 声明
 *
 * */
var Button = function (model) {
    UIObject.call(this, model);
    this.checkModel(model);
    this.model = model;
    this.btnSprite = null;
    this.interactive = true;
};
Button.prototype = Object.create(UIObject.prototype);
Button.prototype.constructor = Button;

/**
 * 检查构造参数是否合法
 *
 * @param model { json } 构造参数
 */
Button.prototype.checkModel = function (model) {
    if (model == null) {
        throw  new Error(" model is null ");
    }
};

/*** 获取 宽高 */
Button.prototype.getSize = function () {
    return this.model.size;
};

/**
 *  设置按钮宽高
 *
 * @param size:{w:500, h:400}, //Size of the stage, w is width, h is heigt
 */
Button.prototype.setSize = function (size) {
    this.model.size = size;
    return this;// 不做 检查  获取时 直接返回这个 对象
};

/**获取绝对位置*/
Button.prototype.getPosition = function () {
    return this.model.positions;
};

/**
 *  *  position:{x:0, y:0}, //Position of the stage
 *
 * @param position 绝对位置
 */
Button.prototype.setPosition = function (position) {
    this.model.positions = position;
    return this;
};

/**
 *初始化按钮事件 所需要的视图
 *
 * @param imgView {default:"默认显示视图",mousedown:"鼠标按下时",mouseup:"按下时松开"，mouseover："移动到位置上",mouseout:"鼠标离开"} 按钮的视图
 *
 */
Button.prototype.setImgView = function (imgView) {
    this.checkImgViewMap(imgView);
    this.model.imgView = imgView;
    return this;
};
/***
 * 设置 视图
 *
 * */
Button.prototype.setThisImgView = function ( url ) {
    var texture = PIXI.Texture.fromImage( url );
    this.btnSprite = new PIXI.Sprite(texture);
    this.btnSprite.texture = texture;
    this.addChild(this.btnSprite);
    var _stage = this.stage;
    texture.baseTexture.on('loaded', function () {
        _stage.repaint();
    });
};
/***
 *
 * show 默认视图
 *
 * */
Button.prototype.showDefaultView = function () {
    this.setThisImgView(this.model.imgView.default);
};
/***
 * show 鼠标按下时候的 视图
 *
 * */
Button.prototype.showMouseDownView = function () {
    this.setThisImgView(this.model.imgView.mousedown);
};
/***
 * show 鼠标按下后松开 时的 视图
 *
 * */
Button.prototype.showMouseUpView = function () {
    this.setThisImgView(this.model.imgView.mouseup);
};
/***
 * show 鼠标 移入时的视图
 *
 * */
Button.prototype.showMouseOverView = function () {
    this.setThisImgView(this.model.imgView.mouseover);
};
/***
 * show 鼠标 离开时候 的视图
 *
 * */
Button.prototype.showMouseOutView = function () {
    this.setThisImgView(this.model.imgView.mouseout);
};
/**
 * 检测 视图对象是否合法
 *
 * @param imgView {default:"默认显示视图",mousedown:"鼠标按下时",mouseup:"按下时松开"，mouseover："移动到位置上",mouseout:"鼠标离开"} 按钮的视图
 *
 */
Button.prototype.checkImgViewMap = function (imgView) {
    if (!imgView) {
        throw new Error(" imgView is null ");
    }
    else if (!imgView.default) {
        //default 不能为空
        throw new Error(" imgView.default is null ");
    }
    else if (!imgView.mousedown) {
        //mousedown 不能为空
        throw new Error(" imgView.mousedown is null ");
    }
};
/***
 * 添加到容器
 *
 * */
Button.prototype.setDefaultTexture = function () {
    this.showDefaultView();
};
/***
 *  重写鼠标按下时候的事件
 *
 * */
Button.prototype.mousedown = function () {
    this.showMouseDownView();
    this.runEventCallback(this.model.mousedown);
};
/***
 * 重写鼠标按下后松开 事件
 *
 * */
Button.prototype.mouseup = function () {
    if (this.model.imgView.mouseup) {
        this.showMouseUpView();
    }
    else {
        this.showDefaultView()
    } //  如果  没有 指定 就还原到 默认视图
    this.runEventCallback(this.model.mouseup);
};
/***
 * 重写 鼠标 移入时 事件
 *
 * */
Button.prototype.mouseover = function () {
    if (this.model.imgView.mouseover) {
        this.showMouseOverView();
    }
    this.runEventCallback(this.model.mouseover);
};
/***
 * show 鼠标 离开时候 的视图
 *
 * */
Button.prototype.mouseout = function () {
    if (this.model.imgView.mouseout) {
        this.showMouseOutView();
    }
    this.runEventCallback(this.model.mouseout);
};
/**
 *
 * 有判断写到这里 方便阅读
 * */
Button.prototype.runEventCallback = function (eventCallback) {
    if (eventCallback) {
        eventCallback();
    }
    // 如果 没有传回调函数 则不回调  只执行默认的 函数
};

/****/

module.exports = Button;//-----------------------------加入到可以被外部引用-------------------------------------