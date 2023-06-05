# 网络编程技术课设-井字棋游戏

一个简单的井字棋游戏，使用 react-ts 和 tauri 实现

ai计算放在了服务器端处理，前后端通信通过 tauri 调用 socket2 库与 cpp 服务端创建 socket 通信实现

服务器端 docker 镜像
```
docker run -p 18080:18080 notooj/cpp-socket-server-example
```