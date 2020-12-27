let pageNow = 1;
let searchValues = {};

let getValue = function (dom) {
    return $(dom).val();
};

let {getSJFXInfo} = Service;

function requestList({pageNow} = {}) {
    let searchValues = utils.getJsonForFormDom('#form');
    searchValues.wsid = parseInt(searchValues.wsid);
    let dataType = getValue('#dataType');
    getSJFXInfo({
        pageNow,
        searchValues
    }).then(function ({data, total}) {
        if (dataType == '1')
            utils.renderTpl('dtjcTpl1', {data}, '#tbody_box');
        if (dataType == '2')
            utils.renderTpl('dtjcTpl2', {data}, '#tbody_box2');
        if (dataType == '3')
            utils.renderTpl('dtjcTpl3', {data}, '#tbody_box3');

        const pageTotal = Math.ceil(total / constants.PAGE_SIZE);
        utils.renderTpl('pageTpl', {total, pageNow, pageTotal}, '#page');
    });
}

$('#dataType').on('change', function () { // 监听 dataType, 获取切换的值
    requestList({pageNow: 1});
});

$('#form').on('submit', function (e) {
    e.preventDefault();
    requestList({pageNow: 1});
});

// 分页
function changePage(current) {
    requestList({pageNow: current});
    pageNow = current;
}

requestList({pageNow: pageNow});

