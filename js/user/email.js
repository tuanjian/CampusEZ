/**
 * Created by Administrator on 2016/3/13.
 */
/* [ ---- Gebo Admin Panel - mailbox ---- ] */

$(document).ready(function() {

    //* new message
    mailbox.new_message();
    //* inbox
    mailbox.inbox();
    //* outbox
    mailbox.outbox();
    //* outbox
    mailbox.trash();

    //* defaults actions: selecting rows, stars
    mailbox.actions();
});

mailbox = {
    inbox: function() {
        $('#dt_inbox').DataTable({
            "oLanguage":{
                "sLengthMenu":"每页_MENU_条数据",
                "sZeroRecords":"抱歉，没有数据",
                "sInfo":"_START_到_END_/共_TOTAL_条数据",
                "sInfoEmpty":"没有数据",
                "sInfoFiltered":"(从_MAX_条数据中检索)",
                "oPaginate":{
                    "sFirst":"首页",
                    "sPrevious":"前一页",
                    "sNext":"后一页",
                    "sLast":"尾页"
                },
                "sZeroRecords":"没有检索到数据",
                "sProcessing":"<img src='images/processing.gif'>",
                "sSearch":"搜索"
            },
            "lengthMenu":[[5,10,25,50,-1],[5,10,25,50,"全部"]],
            "sPaginationtype":"full_numbers",
            "ajax": {
                url: "data/emails.txt",
                dataSrc: function ( json ) {
                    //for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
                    //    json.data[i][0] = '<a href="/message/'+json.data[i][0]+'>View message</a>';
                    //}
                    return json.data;
                }
            },
            "autoWidth": true,
            "deferRender": true,
            "aoColumnDefs":[
                {
                    "bSortable": false,
                    "aTargets": [0],
                    "data": null,
                    "defaultContent": "<input type='checkbox' name='msg_sel'class='select_msg'/>"
                }
            ],
            columns: [
                { "sortable": false, 'width': '19px' },
                { "data": "subject" },
                { "data": "sender" },
                { "data": "date" },
                { "data": "size" }
            ]
        });
    },
    outbox: function() {
        $('#dt_outbox').DataTable({
            "oLanguage":{
                "sLengthMenu":"每页_MENU_条数据",
                "sZeroRecords":"抱歉，没有数据",
                "sInfo":"_START_到_END_/共_TOTAL_条数据",
                "sInfoEmpty":"没有数据",
                "sInfoFiltered":"(从_MAX_条数据中检索)",
                "oPaginate":{
                    "sFirst":"首页",
                    "sPrevious":"前一页",
                    "sNext":"后一页",
                    "sLast":"尾页"
                },
                "sZeroRecords":"没有检索到数据",
                "sProcessing":"<img src='images/processing.gif'>",
                "sSearch":"搜索"
            },
            "lengthMenu":[[5,10,25,50,-1],[5,10,25,50,"全部"]],
            "sPaginationtype":"full_numbers",
            "ajax": "data/emails.txt",
            "autoWidth": true,
            "deferRender": true,
            "columnDefs": [ {
                "targets": 0,
                "data": null,
                "defaultContent": "<input type='checkbox' name='msg_sel'class='select_msg'/>"
            } ],
            columns: [
                { "bSortable": false, 'sWidth': '13px' },
                { "data": "subject" },
                { "data": "sender" },
                { "data": "date" },
                { "data": "size" }
            ]
        });
    },
    trash: function() {
        $('#dt_trash').DataTable({
            "oLanguage":{
                "sLengthMenu":"每页_MENU_条数据",
                "sZeroRecords":"抱歉，没有数据",
                "sInfo":"_START_到_END_/共_TOTAL_条数据",
                "sInfoEmpty":"没有数据",
                "sInfoFiltered":"(从_MAX_条数据中检索)",
                "oPaginate":{
                    "sFirst":"首页",
                    "sPrevious":"前一页",
                    "sNext":"后一页",
                    "sLast":"尾页"
                },
                "sZeroRecords":"没有检索到数据",
                "sProcessing":"<img src='images/processing.gif'>",
                "sSearch":"搜索"
            },
            "lengthMenu":[[5,10,25,50,-1],[5,10,25,50,"全部"]],
            "sPaginationtype":"full_numbers",
            "ajax": "data/emails.txt",
            "autoWidth": true,
            "deferRender": true,
            "columnDefs": [
                {
                    "targets": 0,
                    "data": null,
                    "defaultContent": "<input type='checkbox' name='msg_sel'class='select_msg'/>"
                }
            ],
            columns: [
                { "bSortable": false, 'sWidth': '16px' },
                { "data": "subject"},
                { "data": "sender" },
                { "data": "date" },
                { "data": "size" }
            ]
        });
    },
    actions: function() {
        //$('.table').on('click', '.mbox_star', function(){
        //    $(this).toggleClass('splashy-star_empty splashy-star_full');
        //});
        //
        //$('.table').on('mouseenter','.starSelect', function(){
        //    if($(this).children('i.splashy-star_empty').length) {
        //        $(this).children('i.mbox_star').css('visibility','visible');
        //    }
        //}).on('mouseleave', '.starSelect', function(){
        //    if($(this).children('i.splashy-star_empty').length) {
        //        $(this).children('i.mbox_star').css('visibility','');
        //    }
        //});
        //
        $('.table').on('click','.sel_msgs',function () {
            var checked=$(this).is(":checked");
            var tableid = $(this).data('tableid');
            $('#'+tableid).find('input[name=msg_sel]').each(function(){
                $(this).prop("checked",checked );
            });
            if(checked) {
                $('#'+tableid).find('input[name=msg_sel]').closest('tr').addClass('rowChecked')
            } else {
                $('#'+tableid).find('input[name=msg_sel]').closest('tr').removeClass('rowChecked')
            }
        });
        $('input[name=msg_sel]').on('click',function() {
            if($(this).is(':checked')) {
                $(this).closest('tr').addClass('rowChecked')
            } else {
                $(this).closest('tr').removeClass('rowChecked')
            }
        });
        $("#dt_inbox_actions，#dt_outbox_actions,#dt_trash_actions").on('click', '.delete_msg', function (e) {
            e.preventDefault();
            var tableid = $(this).data('tableid'),
                oTable = $('#'+tableid).dataTable();
            if($('input[name=msg_sel]:checked', '#'+tableid).length) {
                $.colorbox({
                    initialHeight: '0',
                    initialWidth: '0',
                    //height:"174px",
                    //width:"320px",
                    href: "#confirm_dialog",
                    inline: true,
                    opacity: '0.3',
                    onComplete: function(){
                        $('.confirm_yes').click(function(e){
                            e.preventDefault();
                            $('input[name=msg_sel]:checked', oTable.fnGetNodes()).closest('tr').fadeTo(300, 0, function () {
                                $(this).remove();
                                oTable.fnDeleteRow( this );
                                $('.sel_msgs','#'+tableid).attr('checked',false);
                            });
                            $.colorbox.close();
                        });
                        $('.confirm_no').click(function(e){
                            e.preventDefault();
                            $.colorbox.close();
                        });
                    }
                });
            } else {
                $.sticky("请选择要删除的邮件", {autoclose : 5000,position: "top-center", type: "st-info" });
            }
        });
        $('.table tbody').on('click','tr',function(){
            var sender=$('td', this).eq(2).text();
            var date=$('td', this).eq(3).text();
            //$.ajax({
            //    url: 'email/findEmail,
            //data:{
            //    sender : sender,
            //    date : date,
            //},
            //    type: 'post',
            //    cache: false,
            //    dataType: 'json',
            //    success: function (data) {
            //        //*TODO:
            //        //设置#msg_view 内容
            //        $("#msg_view").show();
            //        $('.nav-tabs > .active').removeClass('active');
            //        $('.tab-content> .active').removeClass('active');
            //    },
            //    error: function () {
            //        alert("加载数据异常！");
            //    }
            //});
            $('td', this).eq(3).text();
            $("#msg_view").show();
            $('.nav-tabs > .active').removeClass('active');
            $('.tab-content> .active').removeClass('active');
        })
    },

    new_message: function() {
        ////* recipients
        //$("#mail_recipients").tagHandler({
        //    availableTags: [ 'email1@example.com', 'email2@example.com', 'email3@example.com', 'email4@example.com', 'email5@example.com' ],
        //    autocomplete: true
        //});
        ////* autosize textarea
        //$('.auto_expand').autosize();
        ////* attachments
        //$("#mail_attachments").pluploadQueue({
        //    // General settings
        //    runtimes : 'html5,flash,silverlight',
        //    url : 'lib/plupload/examples/upload',
        //    max_file_size : '10mb',
        //    chunk_size : '1mb',
        //    unique_names : true,
        //
        //    // Specify what files to browse for
        //    filters : [
        //        {title : "Image files", extensions : "jpg,gif,png"},
        //        {title : "Zip files", extensions : "zip"}
        //    ],
        //
        //    // Flash settings
        //    flash_swf_url : 'lib/plupload/js/plupload.flash.swf',
        //
        //    // Silverlight settings
        //    silverlight_xap_url : 'lib/plupload/js/plupload.silverlight.xap'
        //});
        //
        ////* hide upload button
        //$('.plupload_start').hide();
        //
        ////* hide multiupload and show after add_files link
        //$(".mail_uploader").hide();
        //$('.add_files').click(function(e){
        //    e.preventDefault();
        //    $(".mail_uploader").show();
        //    $(this).remove();
        //})
        //
        //$('#new_message_form').submit(function(e) {
        //    var uploader = $('#mail_attachments').pluploadQueue();
        //
        //    // Files in queue upload them first
        //    if (uploader.files.length > 0) {
        //        // When all files are uploaded submit form
        //        uploader.bind('StateChanged', function() {
        //            if (uploader.files.length === (uploader.total.uploaded + uploader.total.failed)) {
        //                //* uncoment next line to submit form after all files are uploaded
        //                //$('#new_message_form')[0].submit();
        //            }
        //        });
        //        uploader.start();
        //    }
        //    return false;
        //});

    }
};
