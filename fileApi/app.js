// 导入 express 模块
const express = require('express')
const joi = require('joi')
    // 创建 express 的服务器实例
const app = express()
const storageRouter = require('./router/storage')

// 导入 cors 中间件
const cors = require('cors')
    // 将 cors 注册为全局中间件
app.use(cors())
    //配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件：
app.use(express.urlencoded({ extended: false }))
    //封装res.scc函数响应数据的中间件
app.use((req, res, next) => {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = (err, status = 1, type) => {

        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//使用配置路由
app.use('/api', storageRouter)


// write your code here...
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function() {
    console.log('api server running at http://127.0.0.1')
})