# Tivy
Tivy is a lightware WebGL UI framework based on Pixi.js. It's designed for TV.

## 使用方法

1.  首先载入 js

    ```html
    <script src="/yourpath/tivy.min.js"></script>
    ```

2.  声明一个场景. 一个场景包含了一个 canvas, 一个 PIXI.Container.
    所有的子元素 都是依赖于这个场景的, 动画管理器也是依赖于此场景

    ```javascript
      var stage = new Tivy.Stage({
        background: '#000',
        id        : 'stage01',
        size      : {width: 1920, height: 1080}
      });
    ```

3.  增加一个 UIObject 元素到场景中.

    ```javascript
        var tile = new Tivy.Tile({
          size: {width: 200, height: 300},
          stage: stage,
          showText: true,
          text: "中文",
          position: {x: 30, y: 30},
          textBgColor: 0x006600,
          textColor: 0xffffff,
          radius: 0
          imageUrl:'./assets/img/test.png'
        });
    ```

4.  增加动画. 别忘记要将动画管理器 run 起来. 你也可以创建一个全局的动画管理, 创建完成之后马上 run 起来.
    为了节约资源, 所有的动画在完成之后将不执行重绘动作

    ```javascript
      var manager = new Tivy.AnimalManager({
        stage   : stage,
        duration: 1000,
        fps     : 30
      });

      manager.addAnimal({
        target  : tile,
        property: 'x',
        from    : 1000,
        to: 100,
        easing  : Tivy.CONST.EASINGS.easeOutQuad
      });
      manager.addAnimal({
        target  : tile,
        property: 'y',
        from    : 1000,
        to: 100,
        easing  : Tivy.CONST.EASINGS.easeOutQuad
      });
      manager.runAnimals();
  ```

5.  事件支持. 采用了 on('xxx', func) 的方式响应事件.

    ```javascript
    tile.on('click', function (data) {});
    ```

    基础事件包括:
    ++ PIXI 的事件（请对照 PIXI 文档）: mousedown, mouseup, mouseover, mouseleave, touchstart, touchmove, touchend
    ++ 扩展键盘事件（标准 windows 事件）:  keydown, keyup, keypress



## API 文档

http://cloudbeer.github.io/Tivy/docs/

## Metro 控件演示

http://cloudbeer.github.io/Tivy/examples/metro.html

## This project is in working now.

## 这个类库还在开发中, 欢迎加入一起开发.

