const ws = require('nodejs-websocket')

// 连接用户上来的总数量
let count =0
// conn没有连接到服务器的用户，都会有一个conn
const server = ws.createServer(conn=>{
  console.log("新的连接");
  count++
  conn.userName = `用户${count}`
  // 1：告诉所有用户，有人加入聊天室
  broadcast(`${conn.userName}进入了聊天室`)


  // 接收到浏览器的数据
  conn.on('text',data=>{
    // 2：当我们接收到某个用户的信息的时候，告诉所有用户，发送的消息是什么
    broadcast(data)
  })


// 关闭连接的时候触发
  conn.on('close',data=>{
    console.log("关闭连接");
    count--
    // 3：告诉所有的用户，有人离开了聊天室
    broadcast(`${conn.userName}离开了聊天室`)

  })
  // 发生异常的时候触发
  conn.on('error',data=>{
    console.log("发生异常");
  })
})

// 广播，给所有的用户发送消息
function broadcast(msg) {
  // 表示所有的用户
  server.connections.forEach(item=>{
    item.send(msg)
  })
  
}

server.listen(3000,()=>{
  console.log("监听端口3000");
})