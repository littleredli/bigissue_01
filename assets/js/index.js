$(function() {
    var layer = layui.layer
        // 初始化用户信息
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            method: "get",
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                rederInfo(res.data)



            }
        })

    }

    function rederInfo(data) {
        var name = data.nickname || data.username
        $('#welcome').html(name)
        if (data.user_pic) {
            $('.layui-nav-img').src(data.user_pic).show().siblings('.fontImg').hide()
        } else {
            $('.fontImg').html(name[0].toUpperCase()).show().siblings('.layui-nav-img').hide()
        }
    }
    // 退出功能
    $('#logout').on('click', function(e) {
        layer.confirm('确认要退出登录吗？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        });

    })
})