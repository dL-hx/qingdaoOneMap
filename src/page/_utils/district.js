$.getJSON('../../_data/district.json')
    .then(function (cities) {
        function appendTowns(data) { // 填充所有的城市
            $(data).each(function (i, n) {
                let $town = $('#town');
                $town.append(`<option value="${n.value}" name="${n.value}">${n.text}</option>`);
            });
        }

        function fullAllTowns(data) {
            $('#town').empty();  //采用JQ的方式清空

            let towns = []
            for (let key in data) {
                const tmp = data[key]
                for (let i = 0; i < tmp.length; i++) {
                    const town = tmp[i]
                    towns.push(town)
                }
            }

            const keyWords = "市属"
            towns.sort(function (a,b) {
                if (a.text.indexOf(keyWords) < b.text.indexOf(keyWords)) {
                    return 1;
                } else {
                    return -1;
                }
            });

            appendTowns(towns);
        }

        fullAllTowns(cities);

        /*
          1. 导入JQ的文件
          2. 文档加载事件:页面初始化
          3. 进一步确定事件:  change事件
          4. 函数: 得到当前选中省份
          5. 得到城市, 遍历城市数据
          6. 将遍历出来的城市添加到城市的select中
        */
        $('#city').on('change', function () {
            //得到城市信息
            let idx = this.value;
            var towns = cities[idx];
            if (idx === "") {
                fullAllTowns(cities);
                return;
            }
            //清空城市select中的option
            /*var $city = $("#city");
            //将JQ对象转成JS对象
            var citySelect = $city.get(0)
            citySelect.options.length = 0;*/
            $('#town').empty();  //采用JQ的方式清空
            //遍历城市数据
            appendTowns(towns);
        });
    });

// 选择数据类型列表, 切换表格分类
$('#dataType').on('change', function () {
    $('.table_box').hide();
    let oi = $(this).val();
    $('#t' + oi).show();
});