const joi = require('@hapi/joi')

const type = joi.string().required()
const apiName = joi.string().required()
const explain = joi.string().required()
const parameter = joi.string().required()
const returnData = joi.string().required()

exports.add_storage_schema = {
    body: {
        type,
        apiName,
        explain,
        parameter,
        returnData,
    }
}