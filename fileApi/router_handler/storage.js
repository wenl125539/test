const db = require('../db/index')

exports.storageFile = (req, res) => {
        const storageInfo = req.body
        if (storageInfo.apiName && storageInfo.type) {
            const sql = `select * from apifile where apiName=?`
            db.query(sql, [storageInfo.apiName], function(err, results) {
                // 执行 SQL 语句失败
                if (err) {
                    return res.cc(err)
                }
                // 用户名被占用
                if (results.length > 0) {
                    return res.cc('该接口已经添加了')
                }
                //定义插入数据库语句

                const sql = 'insert into apifile set ?'
                db.query(sql, storageInfo, (err, results) => {
                    // //执行SQL语句错误
                    if (err) return res.cc(err)
                    if (results.affectedRows !== 1) return res.cc('添加失败')
                    res.cc('添加成功', 0)
                })
            })
        }
    }
    //获取信息
exports.getStorage = (req, res) => {
    const sql = `select * from apifile where status=1`
    db.query(sql, (err, results) => {
        var Data = []
            // //执行SQL语句错误
        if (err) return res.cc(err)
        for (var i in results) {
            var parameter = []
            var returnData = []
            results[i].parameter.split(';').map(item => {
                parameter.push(item.split(','))
            })
            results[i].returnData.split(';').map(item => {
                returnData.push(item.split(','))
            })
            results[i].parameter = parameter
            results[i].returnData = returnData
            Data.push(...results)
        }
        res.cc(Data, 0, 1)
    })
}