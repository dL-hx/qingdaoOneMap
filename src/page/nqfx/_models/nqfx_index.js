let pageNow = 1;

let {getNQFXInfo, getNQFXDetail, addClickAmount} = Service;

function requestList({pageNow} = {}) {
    let searchValues = utils.getJsonForFormDom('#form');
    getNQFXInfo({pageNow, searchValues}).then(function ({data, total}) {
        utils.renderTpl('nqfxTpl', {data}, '#nq_box');
        const pageTotal = Math.ceil(total / constants.PAGE_SIZE);
        utils.renderTpl('pageTpl', {total, pageNow, pageTotal}, '#page');
    });
}

// 向服务器端发送请求, 展示大田监测列表

$('#form').on('submit', function (e) {
    e.preventDefault();
    requestList({pageNow: 1});
});


// 点击看详情
function onClick(id){
    utils.resetFromValue() // 点击详情清空表单的值;
    addClickAmount({id})
}
// 分页
function changePage(current) {
    requestList({pageNow: current});
    pageNow = current;
}

requestList({pageNow: pageNow});


function requestDetail({id} = {}) {
    let searchValues = {
        Id: id
    };

    getNQFXDetail(
        searchValues
    ).then(function ({data}) {
        utils.renderTpl('nqfxxqTpl', data, '#nq_detail');
    });
}
