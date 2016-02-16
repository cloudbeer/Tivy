$(function () {

    var stage = new Tivy.Stage({
        size: {w: 600, h: 600},
        background: '#ccc',
        id: 'buttonSample'
    });
    var button = new Tivy.Button({});
    button.setImgView({default:"./assets/img/test.png",mousedown:"./assets/img/test.png"});

    stage.addChild(button);

    button.reloadView(function()
    {
        console.log(1);
      setTimeout(  stage.repaint, 1000);
    });
    window.stage = stage;
});