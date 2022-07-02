//Demo
var form = layui.form
var parameter = []
var returnData = []
var length = $('#dataInfo tr').length
var datainfomoban = ` 
<tr>
<td><input type="text" name="dataName" placeholder="如（id）" autocomplete="off" class="layui-input">
</td>
<td><input type="text" name="dataType" placeholder="如（int）" autocomplete="off" class="layui-input">
</td>
<td><input type="text" name="analyzing" placeholder="如（不能为空）" autocomplete="off" class="layui-input">
</td>
<td>
    <div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
        <input class="checkbox" type="checkbox" name="layTableCheckbox" lay-skin="primary">
        <div class="layui-unselect layui-form-checkbox " lay-skin="primary">
        <i class="layui-icon layui-icon-ok"></i></div>
    </div>
</td>
</tr>`

var rStringMoban = ` <div class="div-string str">
<input type="text"  required placeholder="error 错误信息" autocomplete="off" class="layui-input">
<div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox">
    <input class="checkbox" type="checkbox" name="layTableCheckbox" lay-skin="primary">
    <div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon layui-icon-ok"></i></div>
</div>
</div>`

var StringMoban = `  <div class="div-string str">
<textarea rows="8" cols="70" placeholder="多个数据用回车分隔"></textarea>
<div class="layui-table-cell laytable-cell-1-0-0 laytable-cell-checkbox" style="margin-top:50px">
    <input class="checkbox" type="checkbox" name="layTableCheckbox" lay-skin="primary">
    <div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon layui-icon-ok"></i></div>
</div>
</div>`

//参数信息添加和删除
$('.add-div i').eq(0).click(() => {
    $('#dataInfo').append(datainfomoban)
    $.getScript("layui/layui.js")
    length = $('#dataInfo tr').length
})
$('.delete').click(() => {
    var deleteArr = []
    $('#dataInfo .checkbox').each(function(index) {
        if ($(this).get(0).checked == true) {
            deleteArr.push(index)
        }
    })
    if (deleteArr.length > 0) {
        deleteArr.sort(function(a, b) { return b - a }).map(item => {
            $('#dataInfo tr').eq(item).remove()
        })
    } else {
        layer.msg('请选择的需要删除的数据')
    }
})

//接口返回信息添加删除
$('.div-btn button').eq(0).click(() => {
    $('.addDeletion').append(rStringMoban)
    $.getScript("layui/layui.js")
})
$('.div-btn button').eq(1).click(() => {
    $('.addDeletion').append(StringMoban)
    $.getScript("layui/layui.js")
})

$('.delete2').click(() => {
    var deleteArr2 = []
    $('#adds .checkbox').each(function(index) {
        if ($(this).get(0).checked == true) {
            deleteArr2.push(index)
        }
    })
    if (deleteArr2.length > 0) {
        deleteArr2.sort(function(a, b) { return b - a }).map(item => {
            $('#adds .div-string').eq(item).remove()
        })
    } else {
        layer.msg('请选择的需要删除的数据')
    }

})


$(document).ready(function() {
    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function() {
        $(".loading").addClass("layui-anim")
        var data = form.val('example')
        for (t = 1; t <= length; t++) {
            var datainfo = []
            for (i = 1; i < 4; i++) {
                inputInfo(t, i)[1] ? datainfo.push(inputInfo(t, i)[1]) : ''
            }
            parameter.push(datainfo.join(','))
        }
        data.parameter = parameter.join(';')

        for (i = 0; i < $('#adds .str .layui-input').length; i++) {
            if ($('#adds .str .layui-input').eq(i).val()) {
                returnData[i] = $('#adds .str .layui-input').eq(i).val()
            }
        }
        for (i = 0; i < $('#adds .str textarea').length; i++) {
            if ($('#adds .str textarea').eq(i).val()) {
                returnData[$('#adds .str .layui-input').length + i] = $('#adds .str textarea').eq(i).val().split('\n').join(',')
            }

        }
        data.returnData = returnData.join(';')
        parameter = []
        returnData = []

        Reflect.deleteProperty(data, 'dataName')
        Reflect.deleteProperty(data, 'dataType')
        Reflect.deleteProperty(data, 'analyzing')
        $.ajax({
            url: '/api/file/AddStorage', //请求的地址
            type: 'post', //请求的方式
            data: data, //携带到后端的参数
            dataType: 'json', //期望后端返回的数据类型
            async: false,
            success: function(res) {
                $(".loading").removeClass("layui-anim")
                layer.msg(res.message)
                document.getElementById('reset').form.reset()
            },
        })

    })

    function inputInfo(lengths, index) {
        var name = $(`#dataInfo tr:nth-child(${lengths}) td:nth-child(${index}) input`).prop("name")
        var value = $(`#dataInfo tr:nth-child(${lengths}) td:nth-child(${index}) input`).val()
        return [name, value]
    }

})