function getTx() {
    let searchValues = {
        wsid: $('#town').val(),
        type: $("input[name='tbfs']:checked").val(),
        starttime: $('#starttime').val()|| utils.getCurrentTime()
    }
    getZXYBChart(searchValues)
        .then(function (data) {
            if (!data) return;

            if ($("input[name='tu']:checked").val() == '1') {
                Graph.renderLineGraph(data);
            } else {
                Graph.renderBarGraph(data);
            }
        });
}


function getDT(type) {
    if (type == '1' || type == '2') {
        return $('#fxJt option:selected').text()
    }

    return $('#fxType option:selected').text(); // 获取 '年', '月'
}


function setElText(id, string) {// 设置元素的文本
    $(id).text(string)
}


const {getZXYB, getZXYBChart} = Service;

function requestList() {

    setElText('#address', $('#town option:selected').text());

    let searchValues = utils.getJsonForFormDom('#form');

    const {type, starttime} = searchValues;
    searchValues.starttime = starttime || utils.getCurrentTime()

    $('#starttimeText').text(searchValues.starttime)

    let dt = getDT(type)

    getZXYB(searchValues)
        .then(function ({data}) {
            utils.renderTpl('zxybTpl', {data: data, dt: dt}, '#zxyb_box')
        });
}

$('#form').on('submit', function (e) {
    e.preventDefault();

    requestList()

    getTx()
});


requestList()