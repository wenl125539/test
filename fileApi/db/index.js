// 导入 mysql 模块
const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host: '114.132.122.36',
    user: 'root',
    password: 'hyj123',
    database: 'my_demo',
})

module.exports = db