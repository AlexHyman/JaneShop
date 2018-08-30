$(function() {
    /* 搜索文本框效果 */
    $("#inputSearch").focus(function() {
        $(this).addClass("focus");
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function() {
        $(this).removeClass("focus");
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    }).keyup(function(e) {
        if (e.which == 13) {
            alert('回车提交表单!');
        }
    })

    //网站换肤
    var $li = $("#skin li");
    $li.click(function() {
        switchSkin(this.id);
    });
    var cookie_skin = $.cookie("MyCssSkin");
    if (cookie_skin) {
        switchSkin(cookie_skin);
    }


    //导航效果
    $("#nav li").hover(function() {
        $(this).find(".jnNav").show();
    }, function() {
        $(this).find(".jnNav").hide();
    });


    /* 添加hot显示 */
    $(".jnCatainfo .promoted").append('<s class="hot"></s>');


    /* 首页大屏广告效果 */
    var $imgrolls = $("#jnImageroll div a");
    $imgrolls.css("opacity", "0.7");
    var len = $imgrolls.length;
    var index = 0;
    var adTimer = null;
    $imgrolls.mouseover(function() {
        index = $imgrolls.index(this);
        showImg(index);
    }).eq(0).mouseover();
    //滑入 停止动画，滑出开始动画.
    $('#jnImageroll').hover(function() {
        if (adTimer) {
            clearInterval(adTimer);
        }
    }, function() {
        adTimer = setInterval(function() {
            showImg(index);
            index++;
            if (index == len) { index = 0; }
        }, 5000);
    }).trigger("mouseleave");


    /* 超链接文字提示 */
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function(e) {
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.myTitle + "</div>"; //创建 div 元素
        $("body").append(tooltip); //把它追加到文档中
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            }).show("fast"); //设置x坐标和y坐标，并且显示
    }).mouseout(function() {
        this.title = this.myTitle;
        $("#tooltip").remove(); //移除 
    }).mousemove(function(e) {
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            });
    });


    /* 品牌活动模块横向滚动 */
    $("#jnBrandTab li a").click(function() {
        $(this).parent().addClass("chos").siblings().removeClass("chos");
        var idx = $("#jnBrandTab li a").index(this);
        showBrandList(idx);
        return false;
    }).eq(0).click();


    /* 滑过图片出现放大镜效果 */
    $("#jnBrandList li").each(function(index) {
        var $img = $(this).find("img");
        var img_w = $img.width();
        var img_h = $img.height();
        var spanHtml = '<span style="position:absolute;top:0;left:5px;width:' + img_w + 'px;height:' + img_h + 'px;" class="imageMask"></span>';
        $(spanHtml).appendTo(this);
    })
    $("#jnBrandList").delegate(".imageMask", "hover", function() {
        $(this).toggleClass("imageOver");
    });
});

function switchSkin(skinName) {
    //当前<li>元素选中
    $("#" + skinName).addClass("selected")
        //去掉其他同辈<li>元素的选中
        .siblings().removeClass("selected");
    //设置不同皮肤
    $("#cssfile").attr("href", "styles/skin/" + skinName + ".css");
    $.cookie("MyCssSkin", skinName, { path: '/', expires: 10 });
}

//显示不同的幻灯片
function showImg(index) {
    var $rollobj = $("#jnImageroll");
    var $rolllist = $rollobj.find("div a");
    var newhref = $rolllist.eq(index).attr("href");
    $("#JS_imgWrap").attr("href", newhref)
        .find("img").eq(index).stop(true, true).fadeIn().siblings().fadeOut();
    $rolllist.removeClass("chos").css("opacity", "0.7")
        .eq(index).addClass("chos").css("opacity", "1");
}

//显示不同的模块
function showBrandList(index) {
    var $rollobj = $("#jnBrandList");
    var rollWidth = $rollobj.find("li").outerWidth();
    //一个版面的宽度
    rollWidth = rollWidth * 4;
    $rollobj.stop(true, false).animate({ left: -rollWidth * index }, 1000);
}