const ws = require('nodejs-websocket')

// 分析
//    type:消息的类型   
//    0：表示进入聊天室的消息
//    1：用户聊天室的消息
//    2：正常的聊天消息
let count =0
const server = ws.createServer(conn=>{
  console.log("新的连接");
  count++
  conn.userName = `用户${count}`
  broadcast(`${conn.userName}进入了聊天室`)


  conn.on('text',data=>{
    broadcast(data)
  })

  conn.on('close',data=>{
    console.log("关闭连接");
    count--
    broadcast(`${conn.userName}离开了聊天室`)

  })
  conn.on('error',data=>{
    console.log("发生异常");
  })
})

function broadcast(msg) {
  server.connections.forEach(item=>{
    item.send(msg)
  })
  
}

server.listen(3000,()=>{
  console.log("监听端口3000");
})