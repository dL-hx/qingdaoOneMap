let Service = {
    getNQFXInfo: function ({pageNow, searchValues} = {}) { // 环境数据
        return utils.pGet('/api/home/GetTBLNQFXInfoList', {
                current: pageNow,
                pageSize: constants.PAGE_SIZE,
                ...searchValues,
            }
        );
    },

    getNQFXDetail: function (values) { // 环境数据详情
        return utils.pGet('/api/home/GetTBLNQFXInfo', values);
    },

    addClickAmount: function (values) { // 增加点击量
        return utils.pGet('/api/home/Click', values)
    }
};