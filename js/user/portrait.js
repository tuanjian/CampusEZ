/**
 * Created by JSexy on 2016/3/15.
 */
//初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName, uploadUrl) {
    var control = $('#' + ctrlName);
    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
        showUpload: false, //是否显示上传按钮
        showCaption: false,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    });
}

//添加记录的窗体处理
formValidate("ffAdd", function (form) {
    $("#add").modal("hide");
    //构造参数发送给后台
    var postData = $("#ffAdd").serializeArray();
    $.post(url, postData, function (json) {
        var data = $.parseJSON(json);
        if (data.Success) {
            //增加肖像的上传处理
            initPortrait(data.Data1);//使用写入的ID进行更新
            $('#file-Portrait').fileinput('upload');

            //保存成功  1.关闭弹出层，2.刷新表格数据
            showTips("保存成功");
            Refresh();
        }
        else {
            showError("保存失败:" + data.ErrorMessage, 3000);
        }
    }).error(function () {
        showTips("您未被授权使用该功能，请联系管理员进行处理。");
    });
});
//初始化图像信息
function initPortrait(ctrlName, id) {
    var control = $('#' + ctrlName);
    var imageurl = '/PictureAlbum/GetPortrait?id=' + id + '&r=' + Math.random();

    //重要，需要更新控件的附加参数内容，以及图片初始化显示
    control.fileinput('refresh', {
        uploadExtraData: { id: id },
        initialPreview: [ //预览图片的设置
            "<img src='" + imageurl + "' class='file-preview-image' alt='肖像图片' title='肖像图片'>",
        ],
    });
}

