const pageSize = 12;
let Service = {
    getTPLLInfo: function (values) { // 图片数据
        return utils.pGet('/api/home/GetJCZ_TPInfoList', {pageSize: pageSize, ...values});
    },
};