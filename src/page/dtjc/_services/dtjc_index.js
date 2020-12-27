
let Service = {
    getSJFXInfo: function ({pageNow,searchValues}={}) { // 数据分析
        return utils.pGet('/api/home/GetTBLJCSJInfoList', {
            pageSize: constants.PAGE_SIZE,
            current: pageNow,
            ...searchValues
        });
    },

    getGraph: function (searchValues) { // 数据分析
        return utils.pGet('/api/home/GetAnalysisInfoList', {
            ...searchValues
        });
    },
};

