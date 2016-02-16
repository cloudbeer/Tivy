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
    PIXI.Sprite.call(this);
    this.checkModel(model);
    this.model = model;
};
Button.prototype = Object.create(PIXI.Sprite.prototype);
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
    this.model.size = size; return this;// 不做 检查  获取时 直接返回这个 对象
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
    this.model.positions = position; return this;
};

/**
 *初始化按钮事件 所需要的视图
 *
 * @param imgView {default:"默认显示视图",mousedown:"鼠标按下时",mouseup:"按下时松开"，mouseover："移动到位置上",mouseout:"鼠标离开"} 按钮的视图
 *
 */
Button.prototype.setImgView = function (imgView) {
    this.checkImgViewMap(imgView);
    this.model.imgView = imgView; return this;
};
/***
 *
 * show 默认视图
 *
 * */
Button.prototype.showDefaultView = function () {
    var texture = PIXI.Texture.fromImage(this.model.imgView.default);
    this.texture = texture; return this;
};
/***
 * show 鼠标按下时候的 视图
 *
 * */
Button.prototype.showMouseDownView = function () {
    var texture = PIXI.Texture.fromImage(this.model.imgView.mousedown);
    this.texture = texture;
};
/***
 * show 鼠标按下后松开 时的 视图
 *
 * */
Button.prototype.showMouseUpView = function () {
    var texture = PIXI.Texture.fromImage(this.model.imgView.mouseup);
    this.texture = texture;
};
/***
 * show 鼠标 移入时的视图
 *
 * */
Button.prototype.showMouseOverView = function () {
    var texture = PIXI.Texture.fromImage(this.model.imgView.mouseover);
    this.texture = texture;
};
/***
 * show 鼠标 离开时候 的视图
 *
 * */
Button.prototype.showMouseOutView = function () {
    var texture = PIXI.Texture.fromImage(this.model.imgView.mouseout);
    this.texture = texture;
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
 *
 * 图片组 加载完毕后 触发回调
 *
 * */
Button.prototype.reloadView = function ( loadCallback ) {
    var loader = new PIXI.loaders.Loader();
    if (this.model.imgView.mouseup) {
        loader.add("mouseup", this.model.imgView.mouseup);
    }
    if (this.model.imgView.mouseover) {
        loader.add("mouseover", this.model.imgView.mouseover);
    }
    if (this.model.imgView.mouseout) {
        loader.add("mouseout", this.model.imgView.mouseout);
    }
    loader.add("default", this.model.imgView.default);
    loader.add("mousedown", this.model.imgView.mousedown);
    loader.once('complete', this.setDefaultTexture( loadCallback ));
    loader.load(); return  this;
};
/***
 * 添加到容器
 *
 * */
Button.prototype.setDefaultTexture = function ( loadCallback ) {
    this.showDefaultView();
    loadCallback();
};

/****/

module.exports = Button;//-----------------------------加入到可以被外部引用-------------------------------------