效果图如下：
![](https://user-gold-cdn.xitu.io/2019/4/17/16a2b3731bd4e631?w=892&h=760&f=gif&s=1427136)
github地址如下：
[github地址](https://github.com/munan2/boxDragger)
## 使用方法
引入js和对应的css

```js
import Drag from '../../static/dragger.js'
import './assets/css/dragger.css'
```
之后，实例化

```js
new Drag({
    id: 'box-dragger',
    showAngle: true,
    isScale: false,
    showBorder: false
})
new Drag({
    id: 'box-dragger2',
    canZoom: false,
    canRotate: false
})
new Drag({
    id: 'img-box',
    showAngle: true,
    showPosition: true
    })
new Drag({
    id: 'test'
})
```
## 具体实现（封装细节）
### 功能细节整理：
- 旋转
- 缩放
- 平移

### 技术难点：
- 旋转时要注意盒子每一个点的位置发生了变化
- 针对拖拽后的盒子的left和top都有变化，计算其left和top时需将其按照中心轴旋转摆正，再进行计算
- 当且仅有一个盒子是被选中的盒子，点击哪个选中哪个。（当前页面多个实例化Drag对象时，如何保证操作互不影响）
- 实现的两种不同方式：
	- 可以选中某元素，直接给该元素内部加上操作的点
	- 有一个pannel，选中某元素时，将这个pannel定位到该元素的位置上
	
这两种方式都实现过一次，第一种比较简单，但是第一种，不好控制选中某个元素才让操作点展示。

### 如何封装：
考虑如何让用户快速上手使用，可参考的点：
- 用户需要传入什么必须的参数
- 暴露给用户什么可设置的参数和方法

### 实现过程
#### 可配置参数
字段| 说明| 是否必填 | 默认值
---|---|---| ---
id | 目标元素id | 是 | 无
container| 父容器id | 否  | body
canRotate | 是否可以旋转 | 否 | true
canZoom | 是否可以缩放| 否 | true
canPull | 是否可以拉升 | 否 | true
canMove | 是否可以平移 | 否 | true
showAngle | 展示角度 | 否 | false
showPosition | 展示位置 | 否 | false
isScale | 是否等比例缩放 | 否 | true
showBorder | 是否展示pannel的border | 否 | false

#### 属性
- canRotate
- canZoom
- canPull
- canMove
- showAngle
- isScale
- id
- container
- targetObj
- pannelDom 操作divdom
- ...

具体看图：
![](https://user-gold-cdn.xitu.io/2019/4/17/16a2be9b0c2cdde0?w=579&h=761&f=png&s=155256)

#### 实现过程
1. 初始化参数
2. 初始化目标dom对象的位置：记录其：
    + left平距左
    + top
    + width
    + height 
    + angle
    + rightBottomPoint 目标dom对象右下坐标
    + rightTopPoint 目标dom对象右上坐标
    + leftTopPoint 目标dom对象左上坐标
    + leftBottomPoint 目标dom对象左下坐标
    + leftMiddlePoint 目标dom对象左中坐标
    + rightMiddlePoint 目标dom对象右中坐标
    + topMiddlePoint 目标dom对象上中坐标
    + bottomMiddlePoint 目标dom对象下中坐标
    + centerPos 目标dom对象中心点坐标
3. 初始化pannel结构  
    **当前的父容器中只有一个pannel结构**，每次实例化对象时，会判断一下如果当前这个父容器里已经存在id为pannel的结构，就将其子节点清空，按照当前实例化对象传进来的属性重新渲染pannel子结构。如果没有id为pannel的结构，就创建。
4. 初始化事件
    + 给pannelDom和targetObj绑定mousedown事件
    + 给document绑定mousemove和mouseup事件
    
    ```js
    initEvent () {
        document.addEventListener('mousemove', e => {
            e.preventDefault && e.preventDefault()
            this.moveChange(e, this.targetObj)
        })
        document.addEventListener('mouseup', e => {
            this.moveLeave(this.targetObj)
        })
        if (this.canMove) {
            // 外层给this.pannelDom添加mousedown事件，是在所有实例化结束后，panneldom被展示在最后一个实例化对象上，鼠标按下它时，触发moveInit事件
            this.pannelDom.onmousedown = e => {
                e.stopPropagation()
                this.moveInit(9, e, this.targetObj)
            }
            this.targetObj.onmousedown = e => {
                e.stopPropagation()
                this.moveInit(9, e, this.targetObj)
                this.initPannel()
                // 在点击其他未被选中元素时，pannel定位到该元素上，重写pannelDom事件，因为此时的this.pannelDom已经根据新的目标元素被重写
                this.pannelDom.onmousedown= e => {
                    this.moveInit(9, e, this.targetObj)
                }
            }
        }
    }
    ```
5. dom操作
    + 旋转操作
      + 鼠标按下时，记录当前鼠标位置距离box中心位置的y/x的反正切函数A1。
      
        ```js
        this.mouseInit = {
            x: Math.floor(e.clientX),
            y: Math.floor(e.clientY)
        }
        this.preRadian = Math.atan2(this.mouseInit.y - this.centerPos.y, this.mouseInit.x - this.centerPos.x) 
        ```
      + 鼠标移动时，记录再次计算鼠标位置距离box中心位置的y/x的反正切函数A2。
      
        ```js
        this.rotateCurrent = {
            x: Math.floor(e.clientX),
            y: Math.floor(e.clientY)
        }
        this.curRadian = Math.atan2(this.rotateCurrent.y - this.centerPos.y, this.rotateCurrent.x - this.centerPos.x)
        ```
      + 求A2-A1，求出移动的弧度
      
        ```js
        this.tranformRadian = this.curRadian - this.preRadian
        ```
      + 求出最后box的旋转角度，this.getRotate(target)是js中获取某dom元素的旋转角度的方法（粘贴过来的，亲测好使）
      
        ```js
        this.angle = this.getRotate(target) +  Math.round(this.tranformRadian * 180 / Math.PI)
        this.preRadian = this.curRadian //鼠标移动的每一下都计算这个角度，所以每一下移动前的弧度值都上一次移动后的弧度值
        ```
      + 计算旋转后box每个点的坐标，根据余弦公式，传入：旋转前每点坐标，旋转中心坐标和旋转角度
      
        ```js
        let disAngle = this.angle - this.initAngle
        this.rightBottomPoint = this.getRotatedPoint(this.initRightBottomPoint, this.centerPos, disAngle)
        this.rightTopPoint = this.getRotatedPoint(this.initRightTopPoint, this.centerPos, disAngle)
        this.leftTopPoint = this.getRotatedPoint(this.initLeftTopPoint, this.centerPos, disAngle)
        this.leftBottomPoint = this.getRotatedPoint(this.initLeftBottomPoint, this.centerPos, disAngle)
        this.leftMiddlePoint = this.getRotatedPoint(this.initLeftMiddlePoint, this.centerPos, disAngle)
        this.rightMiddlePoint = this.getRotatedPoint(this.initRightMiddlePoint, this.centerPos, disAngle)
        this.topMiddlePoint = this.getRotatedPoint(this.initTopMiddlePoint, this.centerPos, disAngle)
        this.bottomMiddlePoint = this.getRotatedPoint(this.initBottomMiddlePoint, this.centerPos, disAngle)
       ```
    + 沿着一个方向拉升操作。
    + 沿着一个角缩放操作。
    这两个操作，主要参考了一个大佬的拖拽思想实现的 [github wiki地址](https://github.com/shenhudong/snapping-demo/wiki)
    
6. 优化，mousemove事件添加节流函数

    ```js
    function throttle(fn, interval) {
        let canRun = true;
        return function () {
            if (!canRun) return;
            canRun = false;
            setTimeout(() => {
                fn.apply(this, arguments);
                canRun = true;
            }, interval);
        };
    }
    let that = this
    document.addEventListener('mousemove', throttle(function (e) {
        e.preventDefault && e.preventDefault()
        that.moveChange(e, that.targetObj)
    }, 10))
    ```