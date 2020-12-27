var Graph = function () {
    return {
        renderLineGraph: function (data) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('chart'));
            const oc = {
                xAxis: 0,
                jsl: {
                    key: 2,
                    text: '降雨量',
                },

                legend: ['降雨量'],
            };


// 指定图表的配置项和数据
            var option = {
                color: [
                    '#60c0dd',
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
                dataZoom: [
                    {
                        type: 'inside',
                        start: 80,
                        end: 100,
                    },
                    {
                        show: true,
                        start: 0,
                        end: 80,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }
                ],
                series: [
                    {
                        name: oc.jsl.text,
                        type: 'line',
                        data: data[oc.jsl.key],
                    },
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    };
}();