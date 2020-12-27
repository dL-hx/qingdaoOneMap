$(function () {

    const fxTypes = {
        "1": [
            {
                "text": "第一周",
                "value": "1"
            },
            {
                "text": "第二周",
                "value": "2"
            }, {
                "text": "第三周",
                "value": "3"
            }, {
                "text": "第四周",
                "value": "4"
            }
        ],
        "2": [
            {
                "text": "上旬",
                "value": "1"
            },
            {
                "text": "中旬",
                "value": "2"
            },
            {
                "text": "下旬",
                "value": "3"
            },
        ],
        "3": null,
        "4": null,
    }


    $('#fxType').on('change', function () {
        //得到城市信息
        let idx = this.value;

        var fxType = fxTypes[idx];

        $('#fxJt').empty();  //采用JQ的方式清空

        if (fxType) {
            //遍历城市数据
            $(fxType).each(function (i, n) {
                $('#fxJt').append(`<option value="${n.value}" name="${n.value}">${n.text}</option>`);
            });
            $('#fxJt').show();
        } else {
            $('#fxJt').hide();
        }
    });
});