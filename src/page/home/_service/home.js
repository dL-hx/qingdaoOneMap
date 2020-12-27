const currentAndType = {
    current: 1,
    type: 1
};

let Service = {
    getAllPointLocation: function (pointCount) {
        return utils.pGet('/api/home/GetTBLSBXXInfoList', {
            pageSize: pointCount,
            ...currentAndType
        });
    },

    getSQJCAndSJCJCount: function (callback) { // 获取墒情监测, 和数据采集的数量
        return utils.pGet('/api/Home/GetCount', {}, callback);
    },

    getOnePointSSSJ: function (sbid, callback) { // 实时数据
        return utils.pGet('/api/home/GetTBLJCSJInfoList', {pageSize: 1, sbid: sbid, ...currentAndType}, callback);
    },

    getOnePointTPYL: function (sbid, callback) { // 图片预览
        return utils.pGet('/api/Home/GetJCZ_TPInfoList', {pageSize: 4, sbid: sbid, current: 1}, callback);
    },

    getOnePointNQFX: function (callback) {// 农情分析
        return utils.pGet('/api/home/GetTBLNQFXInfoList', {pageSize: 3, current: 1}, callback);
    },

    getOnePointNQFXQS: function (sbid) {// 农情分析趋势
        return utils.pGet('/api/Home/GetTBLNQBHQSInfoList', {sbid});
    },
    getOnePointVideo: function (sbid) {// 视频数据接口
        return utils.pGet('/api/home/GetMyMonitorInfoList', {sbid});
    },
    getOnePointHJYJ: function (sbid) { // 环境预警数据
        return utils.pGet('/api/home/GetHJSJYJInfoList', {pageSize: 3, sbid: sbid, current: 1});
    },

    getOnePointXZFX: function (sbid) { // 旬值分析数据
        return utils.pGet('/api/home/GetXZFXInfoList', {
                sbid: sbid,
            }
        );
    },
};