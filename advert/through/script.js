/*
v1.0 jQuery baigo ADS 通屏 插件
(c) 2013 baigo studio - http://www.baigo.net/ads/
License: http://www.opensource.org/licenses/mit-license.php
*/

(function($){
    $.fn.adsThrough = function(options) {
        "use strict";
        var thisObj = $(this); //定义当前对象
        var _parent_id = thisObj.attr("id");
        var _posiRow;
        var _str_advert;
        var _str_attach;
        var _str_href;

        var defaults = {
            loading: "Loading...",
            position: "top",
            close: "&times; close"
        };

        var opts = $.extend(defaults, options);
        var _css_posi;

        switch (opts.position) {
            case "bottom":
                _css_posi = { bottom: 0, left: 0 };
            break;

            default:
                _css_posi = { top: 0, left: 0 };
            break;
        }

        $.ajax({
            url: opts.data_url, //url
            type: "get",
            dataType: "jsonp", //数据格式为jsonp
            data: "",
            beforeSend: function(){
                _str_advert = "<div class='throughChild'></div>";
                thisObj.html(_str_advert);

                $("#" + _parent_id + " .throughChild").css(_css_posi);
                $("#" + _parent_id + " .throughChild").text(opts.loading);
            }, //输出消息
            success: function(_result){ //读取返回结果
                if (typeof _result.posiRow != "undefined" && typeof _result.advertRows[0] != "undefined") {
                    _posiRow = _result.posiRow;

                    if (typeof _result.advertRows[0].advert_href != "undefined") {
                        _str_href = _result.advertRows[0].advert_href;
                    }

                    if (typeof _posiRow.posi_type != "undefined" && _posiRow.posi_type == "attach" && typeof _result.advertRows[0].attachRow.attach_url != "undefined") {
                        _str_attach = "<img src='" + _result.advertRows[0].attachRow.attach_url + "' width='100%'>";
                    } else if (typeof _result.advertRows[0].advert_content != "undefined") {
                        _str_attach = _result.advertRows[0].advert_content;
                    }

                    _str_advert = "<div class='btn_close'><a href='javascript:void(0);'>" + opts.close + "</a></div><div><a href='" + _str_href + "' target='_blank'>" + _str_attach + "</a></div>";

                    $("#" + _parent_id + " .throughChild").html(_str_advert);

                    $("#" + _parent_id + " throughChild .btn_close").click(function(){
                        $("#" + _parent_id + " .throughChild").hide();
                    });
                }
            }
        });
    };
})(jQuery);