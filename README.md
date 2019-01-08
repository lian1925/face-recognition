# face-recognition

提供简单的 react 工程框架，实现前端独立完成人脸检测功能，用于验证 face-api.js 与 tracking.js 的人脸检测功能。

效果演示

## Build

```bash
npm i
npm run build
```

## Run

```bash
npm start
```

Go to http://localhost:3000 in your browser

## 参考

Github 主流的 JavaScript 版本的人脸识别项目，整理如下：  
1、tracking.js  
https://github.com/eduardolundgren/tracking.js  
优点：不需依赖 webgl，支持多人脸，支持自己训练 model  
缺点：该库将对象封装成 window 全局变量，需要改写为小程序支持的 es6 module

2、face-api.js  
https://github.com/justadudewhohacks/face-api.js  
优点：支持多个主流的人脸识别 model，支持自定义训练 model，性能高  
缺点：依赖 tensorflow-core,依赖 webgl，小程序不支持

3、clmtrackr  
https://github.com/auduno/clmtrackr  
优点：实现了 regularized landmark mean-shift 算法，提供高性能的人脸动态跟踪。  
缺点：该库主要偏重于人脸跟踪，而非人脸检测；当存在多张人脸时，只能跟踪单个人脸

4、jquery.facedetection  
https://github.com/jaysalvat/jquery.facedetection  
缺点：依赖 jQuery 插件

5、ccv  
https://github.com/liuliu/ccv  
优点：支持多种设备，包括 Mac OSX, Linux, FreeBSD, Windows\*, iPhone, iPad, Android, Raspberry Pi  
缺点：依赖 c 编译环境
