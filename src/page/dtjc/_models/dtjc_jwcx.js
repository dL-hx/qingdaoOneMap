let {getGraph} = Service;
let gp = [];

$('#form').on('submit', function (e) {
    e.preventDefault();
    requestList();
});

function requestList() {
    let searchValues = utils.getJsonForFormDom('#form');
    searchValues.wsid = parseInt(searchValues.wsid);
    getGraph(searchValues)
        .then(function (data) {
            Graph.renderLineGraph([data.jcsj,data.kqwd,data.jyl,data.trwd, data.trsd])
        })
}

requestList()