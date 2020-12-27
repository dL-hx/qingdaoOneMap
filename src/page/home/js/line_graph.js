var Graph = function () {
	return {
		renderLineGraph: function (data) {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('chart'));
			const oc = {
				xAxis: 0,
				kqwd: {
					key: 1,
					text: '空气温度',
				},
				jsl: {
					key: 2,
					text: '降雨量',
				},
				trwd: {
					key: 3,
					text: '土壤温度',
				},
				trsd: {
					key: 4,
					text: '土壤湿度',
				},
				legend: ['空气温度', '降雨量', '土壤温度', '土壤湿度'],
			};


			// 指定图表的配置项和数据
			var option = {
				backgroundColor: '#181818',
				color: [
					'#2f7ed8',
					'#f5a34a',
					'#30f098',
					'#910000',

				],

				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: oc.legend,
					top: '20px', //距上边距
					textStyle: { //图例文字的样式
						color: '#63c7a3',
						fontSize: 13
					}
				},
				grid: {
					left: 25,
					right: '0%',
					top: '25%',
					bottom: '10%'
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: data[oc.xAxis],
					axisLine: {
						lineStyle: {
							color: '#ffffff'
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#ffffff'
						}
					},
					splitLine: {
						show: false, //去掉Y轴分割线
					}
				},
				series: [{
					name: oc.kqwd.text,
					type: 'line',
					data: data[oc.kqwd.key],
				}, {
					name: oc.jsl.text,
					type: 'line',
					data: data[oc.jsl.key],
				}, {
					name: oc.trwd.text,
					type: 'line',
					data: data[oc.trwd.key],
				}, {
					name: oc.trsd.text,
					type: 'line',
					data: data[oc.trsd.key],
				}, ]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}
	};

}();