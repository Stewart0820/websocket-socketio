// 创建了http服务器
const http = require('http')
var fs = require('fs')
const app = http.createServer()

app.on('request', (req, res) => {
	fs.readFile(__dirname + '/index.html', function (err, data) {
		if (err) {
			res.writeHead(500)
			return res.end('Error loading index.html')
		}

		res.writeHead(200)
		res.end(data)
	})
})
app.listen(3000, () => {
	console.log('服务器启动成功')
})
var io = require('socket.io')(app)

// 监听了用户连接的事件
// socket表示用户的连接
// socket.emit 表示触发了某个事件
//   如果需要给浏览器发数据，需要触发浏览器注册的某个事件
// socket.on 表示的注册某个事件
//   如果我要获取浏览器的数据，需要注册一个事件，等待浏览器返回数据
io.on('connection', (socket) => {
	console.log('用户连接了')
	// 参数1：事件的名字
	// 服务器接收数据

	socket.on('hello', (data) => {
		console.log(data)

		// 服务器发送数据
		socket.emit('send', data)
	})
})
