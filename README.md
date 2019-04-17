<!--
 * @Description: 
 * @Author: zy
 * @LastEditors: zy
 * @Date: 2019-04-17 10:12:23
 * @LastEditTime: 2019-04-17 10:12:40
 -->
# 拖拽功能封装：
## 功能细节整理：
- 旋转
- 缩放
- 平移

## 技术难点：
- 旋转时要注意盒子每一个点的位置发生了变化
- 针对旋转后的盒子的left和top都有变化，计算其left和top时需将其按照中心轴旋转摆正，再进行计算

## 如何封装：

考虑如何让用户快速上手使用，可参考的点：

- 传入什么参数进去
- 暴露给用户什么可设置的参数和方法

## 封装难点
- 当前页面多个实例化dragger时，如何保证操作互不影响

## 实现过程
### 可配置参数
- id 目标元素id
- parentNode 背景幕布id
- canRotate 是否可以旋转
- canZoom 是否可以缩放
- canPull 是否可以拉升
- canMove 是否可以平移
- showAngle 展示角度
- showPosition 展示位置
- isScale 是否等比例缩放

### 属性
- canRotate
- canZoom
- canPull
- canMove
- showAngle
- isScale
- id
- parentNode
- targetObj
- pannelDom 操作divdom
- 
