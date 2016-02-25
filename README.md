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

3.  增加一个 UIObject 元素. 每一个 UIObject 元素都必须指定一个 stage.
    多层嵌套还必须指定 owner - 父亲. 没有指定 onwer 的直接将加入 stage.
    无需调用 addChild

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


## API 文档

http://cloudbeer.github.io/Tivy/docs/

## Metro 控件演示

http://cloudbeer.github.io/Tivy/examples/metro.html

## This project is in working now.

## 这个类库还在开发中, 欢迎加入一起开发.

