let Service = {
    getZXYB: function (value) { // 环境数据
        return utils.pGet('/api/home/GetZXYBInfoList', value);
    },
    getZXYBChart: function (value) {
        return utils.pGet('/api/home/GetZXYAnalysisInfoList', value);
    },
};