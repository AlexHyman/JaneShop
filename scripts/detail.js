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


    /*使用jqzoom*/
    $('.jqzoom').jqzoom({
        zoomType: 'standard',
        lens: true,
        preloadImages: false,
        alwaysOn: false,
        zoomWidth: 340,
        zoomHeight: 340,
        xOffset: 10,
        yOffset: 0,
        position: 'right'
    });


    /*衣服颜色切换*/
    $(".color_change ul li img").click(function() {
        $(this).addClass("hover").parent().siblings().find("img").removeClass("hover");
        var imgSrc = $(this).attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0, i);
        var imgSrc_small = imgSrc + "_one_small" + unit;
        var imgSrc_big = imgSrc + "_one_big" + unit;
        $("#bigImg").attr({ "src": imgSrc_small });
        $("#thickImg").attr("href", imgSrc_big);
        var alt = $(this).attr("alt");
        $(".color_change strong").text(alt);
        var newImgSrc = imgSrc.replace("images/pro_img/", "");
        $("#jnProitem .imgList li").hide();
        $("#jnProitem .imgList").find(".imgList_" + newImgSrc).show();
        //解决问题：切换颜色后，放大图片还是显示原来的图片。
        $("#jnProitem .imgList").find(".imgList_" + newImgSrc).eq(0).find("a").click();
    });


    /* 点击左侧产品小图片切换大图 */
    $("#jnProitem ul.imgList li a").bind("click", function() {
        var imgSrc = $(this).find("img").attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0, i);
        var imgSrc_big = imgSrc + "_big" + unit;
        $("#thickImg").attr("href", imgSrc_big);
    });


    /*Tab 选项卡 标签*/
    var $div_li = $("div.tab_menu ul li");
    $div_li.click(function() {
        $(this).addClass("selected") //当前<li>元素高亮
            .siblings().removeClass("selected"); //去掉其他同辈<li>元素的高亮
        var index = $div_li.index(this); // 获取当前点击的<li>元素 在 全部li元素中的索引。
        $("div.tab_box > div") //选取子节点。不选取子节点的话，会引起错误。如果里面还有div 
            .eq(index).show() //显示 <li>元素对应的<div>元素
            .siblings().hide(); //隐藏其他几个同辈的<div>元素
    }).hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    })


    /*衣服尺寸选择*/
    $(".pro_size li").click(function() {
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).parents("ul").siblings("strong").text($(this).text());
    })


    /*数量和价格联动*/
    var $span = $(".pro_price strong");
    var price = $span.text();
    $("#num_sort").change(function() {
        var num = $(this).val();
        var amount = num * price;
        $span.text(amount);
    }).change();


    /*商品评分效果*/
    //通过修改样式来显示不同的星级
    $("ul.rating li a").click(function() {
        var title = $(this).attr("title");
        alert("您给此商品的评分是：" + title);
        var cl = $(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass("rating " + cl + "star");
        //去掉超链接的虚线框
        $(this).blur();
        return false;
    })


    /*最终购买输出*/
    var $product = $(".jnProDetail");
    $("#cart a").click(function(e) {
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size strong").text();
        var pro_color = $(".color_change strong").text();
        var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price strong").text();
        var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是：" + pro_name + "；" +
            "尺寸是：" + pro_size + "；" +
            "颜色是：" + pro_color + "；" +
            "数量是：" + pro_num + "；" +
            "总价是：" + pro_price + "元。</div>";
        $("#jnDialogContent").html(dialog);
        $('#basic-dialog-ok').modal();
        //避免页面跳转
        return false;
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