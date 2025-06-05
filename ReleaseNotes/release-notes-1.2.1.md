# QNRTPlayer Release Notes for 1.2.1

## 简介
七牛低延时直播（Geek）直播构建了全新的低延时直播互动体验，相比于传统的直播能力降低了延时、优化了协议与底层技术，目前对于微信内直播多业务场景提供了更为优渥的使用体验。支持千万级并发同时拥有毫秒级开播体验，打通了用户对于直播低延时性的核心诉求。

## 功能
- 新增播放信息日志打点
- config 新增自定义 uid 字段
```javascript
const player = new QNRTPlayer();
// 如果没有在 init 中传入 uid 字段，那么 sdk 会内部生成一个随机的 uid
const option = { ...otherOptions, uid: '自定义 id' };
}
player.init(option);
```
- QNRTPlayer 新增 getUID 方法
```javascript
const player = new QNRTPlayer();
const uid = player.getUID();
```

## 调整
- getPlayerSupport 调整为异步方法，不会再有返回 undefined 的情况
```javascript
const player = new QNRTPlayer();
const suppoort = await player.getPlayerSupport();
```