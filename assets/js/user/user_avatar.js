$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 4 / 3,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
        // 为上传按钮绑定点击事件
    $('#imgUpload').click(function() {
        $('#file').click()
    })
    var layer = layui.layer
    $('#file').change(function(e) {
            var files = e.target.files
            if (files.length === 0) {
                return layer.msg('请选择图片')
            }
            var imgfile = files[0]
            var newImgUrl = URL.createObjectURL(imgfile)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgUrl) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        //上传图像
    $('#btnUpload').click(function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })

})