let pageNow = 1;
// let searchValues = {};

let {getHJSJYJInfo} = Service;

function requestList({pageNow} = {}) {
    // let searchValues = utils.getJsonForFormDom('#form');
    // searchValues.wsid = parseInt(searchValues.wsid)
    
    let searchValues = {
        StartFBTIME:$('#startTime').val(),    
        EndFBTIME:$('#endTime').val(),
        WSID:$('#town').val(),
        pagesize:constants.PAGE_SIZE,
        current:pageNow
    }
    getHJSJYJInfo(
        searchValues
    ).then(function ({data, total}) {
        utils.renderTpl('hjsjTpl', {data}, '#hjsj_box');
        const pageTotal = Math.ceil(total / constants.PAGE_SIZE);
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

requestList({pageNow: pageNow });

