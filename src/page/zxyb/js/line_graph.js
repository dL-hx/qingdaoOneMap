const Graph = function () {
    let myChart = echarts.init(document.getElementById('chart'));  // 基于准备好的dom，初始化echarts实例

    const oc = {
        xAxis: "jcsj",
        kqwd: {
            key: 'kqwd',
            text: '空气温度',
        },
        jyl: {
            key: 'jyl',
            text: '降雨量',
        },
        trwd: {
            key: 'trwd',
            text: '土壤温度',
        },
        trsd: {
            key: 'trsd',
            text: '土壤湿度',
        },
        legend: ['空气温度', '降雨量', '土壤温度', '土壤湿度'],
    };

    return {
        renderLineGraph: function (data) {
// 指定图表的配置项和数据
            const option = {
                color: [
                    '#c1232b',
                    '#27727b',
                    '#fcce10',
                    '#e87c25',
                    '#b5c334',
                    '#fe8463',
                    '#9bca63',
                    '#fad860',
                    '#f3a43b',
                    '#60c0dd',
                    '#d7504b',
                    '#c6e579',
                    '#f4e001',
                    '#f0805a',
                    '#26c0c0'
                ],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: oc.legend,
                    top: '20px',//距上边距
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data[oc.xAxis]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: oc.kqwd.text,
                        type: 'line',
                        data: data[oc.kqwd.key],
                    },
                    {
                        name: oc.jyl.text,
                        type: 'line',
                        data: data[oc.jyl.key],
                    },
                    {
                        name: oc.trwd.text,
                        type: 'line',
                        data: data[oc.trwd.key],
                    },
                    {
                        name: oc.trsd.text,
                        type: 'line',
                        data: data[oc.trsd.key],
                    },
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        renderBarGraph: function (data) {
            // 指定图表的配置项和数据
            const option = {
                color: [
                    '#c1232b',
                    '#27727b',
                    '#fcce10',
                    '#e87c25',
                    '#b5c334',
                    '#fe8463',
                    '#9bca63',
                    '#fad860',
                    '#f3a43b',
                    '#60c0dd',
                    '#d7504b',
                    '#c6e579',
                    '#f4e001',
                    '#f0805a',
                    '#26c0c0'
                ],
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: oc.legend,
                    top: '20px',//距上边距
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data[oc.xAxis]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: oc.kqwd.text,
                        type: 'bar',
                        data: data[oc.kqwd.key],
                    },
                    {
                        name: oc.jyl.text,
                        type: 'bar',
                        data: data[oc.jyl.key],
                    },
                    {
                        name: oc.trwd.text,
                        type: 'bar',
                        data: data[oc.trwd.key],
                    },
                    {
                        name: oc.trsd.text,
                        type: 'bar',
                        data: data[oc.trsd.key],
                    },
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    };
}();