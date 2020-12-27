let pageNow = 1;
let searchValues = {};

let {getTPLLInfo} = Service;

function requestList({pageNow} = {}) {
    let searchValues = {
        StartFBTIME: $('#startTime').val(),
        EndFBTIME: $('#endTime').val(),
        WSID: $('#town').val(),
        current: pageNow
    };
    // searchValues.wsid = parseInt(searchValues.wsid)
    getTPLLInfo(
        searchValues
    ).then(function ({data, total}) {
        utils.renderTpl('tpllTpl', {data}, '#photo_box');
        const pageTotal = Math.ceil(total / pageSize);
        utils.renderTpl('pageTpl', {total, pageNow, pageTotal}, '#page');
    });
}

// 向服务器端发送请求, 展示大田监测列表

$('#form').on('submit', function (e) {
    e.preventDefault();
    requestList({pageNow: 1});
});


// 分页
function changePage(current) {

    requestList({pageNow: current});
    pageNow = current;
}

requestList({pageNow: pageNow,});

