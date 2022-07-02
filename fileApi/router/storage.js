const express = require('express')
const expressJoi = require('@escook/express-joi')
const storage_handler = require('../router_handler/storage')

const add_storage_schema = require('../schema/storage')
    // 创建路由对象
const router = express.Router()

router.post('/file/AddStorage', expressJoi(add_storage_schema), storage_handler.storageFile)
router.get('/file/GetStorage', storage_handler.getStorage)

// 将路由对象共享出去
module.exports = router