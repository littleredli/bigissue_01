$(function() {
    $('#toReg').click(function() {
        $('.loginBox').hide().siblings('.regBox').show()
    })
    $('#tologin').click(function() {
        $('.regBox').hide().siblings('.loginBox').show()
    })
    var form = layui.form

    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(val) {
            var pval = $('.regBox [name=password]').val()
            if (pval !== val) {
                return '两次输入的密码不一致'
            }

        }
    })
    var layer = layui.layer

    $('#regForm').submit(function(e) {
        e.preventDefault()
        var data = {
            username: $('#regForm [name=username]').val(),
            password: $('#regForm [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);

            }
            layer.msg('注册成功,请登录')
            $('#tologin').trigger('click')
        })
    })
    $('#loginForm').submit(function(e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})