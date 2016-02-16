$(function () {

    var stage = new Tivy.Stage({
        size: {w: 600, h: 600},
        background: '#ccc',
        id: 'buttonSample'
    });
    var button = new Tivy.Button({ stage: stage });
    button.setImgView({default: "./assets/img/d.png", mousedown: "./assets/img/d1.png"}).setDefaultTexture();
    stage.addChild(button);
    window.stage = stage;
});