$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称不得超过六位'
                }
            }
        })
        // 初始化用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $('#resetUserInfo').on('click', function(e) {
            e.preventDefault()
            initUserInfo()
        })
        // 提交修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('提交用户信息失败')
                }
                layer.msg('提交用户信息成功')

                window.parent.getUserInfo()
            }
        })
    })

})