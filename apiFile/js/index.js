var i = []
var word
    //返回数据下拉
var fanHui = $('.return .layui-colla-icon')
$('.return').each(function(index) {
    $(this).click(() => {
        $('.return ul').eq(index).animate({
            height: 'toggle'
        })

        i.indexOf(index) !== -1 ?
            fanHui.eq(index).text('')
            (i = i.filter((item) => { return item !== index })) :
            i.push(index)
        fanHui.eq(index).text('')


    })
})

//post和get变化背景颜色
$('h2 p:first-child').map(item => {
    $('h2 p:first-child').eq(item).html() == 'GET' ?
        $('h2 p:first-child').eq(item).css('background', '#31BDEC') :
        $('h2 p:first-child').eq(item).css('background', '#ffb800')
})


//注意：折叠面板 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function() {
    var element = layui.element
        //…
})

getData()

//管理按钮
$('.btn').click(() => {
    $('.div-from').animate({
        height: 'toggle'
    })
})

$('.div-from button').eq(0).click(() => {
    $('.div-from').animate({
        height: 'toggle'
    })
})
$('.div-from button').eq(1).click(() => {
    $('.div-from').animate({
        height: 'show'
    })
    if ($('#password').val() == 000000) {
        window.location.href = 'manage.html'
        $('.div-from').animate({
            height: 'toggle'
        })
        $('.tshi').hide()
    } else {
        $('.tshi').show()

    }

})

function getData() {
    $.ajax({
        url: '/api/file/GetStorage', //请求的地址
        type: 'get', //请求的方式
        data: {}, //携带到后端的参数
        dataType: 'json', //期望后端返回的数据类型
        async: false,
        success: function(res) {
            console.log(res)
        },
    })
}