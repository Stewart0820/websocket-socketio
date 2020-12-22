const ws = require('nodejs-websocket')
const PORT = 3000

// 创建一个server
// 1:如何处理用户传来的信息

// 每次只要有用户连接，function函数就会执行，会给当前的用户创建一个connect对象
const server = ws.createServer(connect => {
  console.log("有用户连接上来了");
  // 每当有用户传递数据，这个text事件就会被触发
  connect.on('text',data =>{
    console.log('接收到了用户的数据',data);
    // 给用户一个响应的数据
    connect.send(data)
  })

  // 只要websocket连接断开，close事件就会触发
  connect.on('close',()=>{
    console.log("连接断开");
  })

  // 注册一个error，处理用户的错误信息
  connect.on('error',()=>{
    console.log('用户连接异常');
  })
})


server.listen(PORT,()=>{
  console.log('websocket服务启动成功了，监听了端口'+PORT);
})