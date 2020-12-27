let bMap = new AMap.Map('bmap', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom: 8, //初始化地图层级
    // zoomEnable: false,
    // dragEnable: false,
    center: [120.305966, 36.292002],//初始化地图中心点
    mapStyle: 'amap://styles/c2bedaac7bc156b68366e54a29713614', //设置地图的显示样式
});


bMap.plugin(['AMap.Scale', 'AMap.ControlBar'], function () {
    // map.addControl(new AMap.Scale());
    // map.addControl(new AMap.ControlBar({ showZoomBar: true, showControlButton: false, position: { right: '20 px', bottom: '20px' } }));
});

let colors = [
    '#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00',
    '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707',
    '#651067', '#329262', '#5574a6', '#3b3eac'
];


AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], function (DistrictExplorer, $) {

    //创建一个实例
    var districtExplorer = window.districtExplorer = new DistrictExplorer({
        eventSupport: true, //打开事件支持
        map: bMap
    });

    //当前聚焦的区域
    var currentAreaNode = null;
    //监听feature的hover事件
    districtExplorer.on('featureMouseout featureMouseover', function (e, feature) {
        if (!feature) {
            return;
        }
        var isHover = e.type === 'featureMouseover';
        var props = feature.properties;
        //更新相关多边形的样式
        var polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
        for (var i = 0, len = polys.length; i < len; i++) {
            polys[i].setOptions({fillOpacity: isHover ? 0.1 : 0.35});
        }
    });
    //feature被点击
    districtExplorer.on('featureClick', function (e, feature) {
        var props = feature.properties;
        //如果存在子节点
        if (props.childrenNum > 0) {
            //切换聚焦区域
            switch2AreaNode(props.adcode);
        }
    });
    //外部区域被点击
    districtExplorer.on('outsideClick', function (e) {

        districtExplorer.locatePosition(e.originalEvent.lnglat, function (error, routeFeatures) {

            if (routeFeatures && routeFeatures.length > 1) {
                //切换到省级区域
                switch2AreaNode(370200);
            }
        }, {
            levelLimit: 1
        });
    });

    //绘制某个区域的边界
    function renderAreaPolygons(areaNode) {
        //更新地图视野
        bMap.setBounds(areaNode.getBounds(), null, null, true);
        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons();
        //绘制子区域
        districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
            var fillColor = colors[i % colors.length];
            var strokeColor = colors[colors.length - 1 - i % colors.length];
            return {
                cursor: 'default',
                bubble: true,
                strokeColor: strokeColor, //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 1, //线宽
                fillColor: fillColor, //填充色
                fillOpacity: 0.35, //填充透明度
            };
        });

        //绘制父区域
        districtExplorer.renderParentFeature(areaNode, {
            cursor: 'default',
            bubble: true,
            strokeColor: 'black', //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: null, //填充色
            fillOpacity: 0.35, //填充透明度
        });
    }

    //切换区域后刷新显示内容
    function refreshAreaNode(areaNode) {
        districtExplorer.setHoverFeature(null);
        renderAreaPolygons(areaNode);
    }

    //切换区域
    function switch2AreaNode(adcode, callback) {
        if (currentAreaNode && ('' + currentAreaNode.getAdcode() === '' + adcode)) {
            return;
        }
        loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
                if (callback) {
                    callback(error);
                }
                return;
            }
            currentAreaNode = window.currentAreaNode = areaNode;
            //设置当前使用的定位用节点
            districtExplorer.setAreaNodesForLocating([currentAreaNode]);
            refreshAreaNode(areaNode);
            if (callback) {
                callback(null, areaNode);
            }
        });
    }

    //加载区域
    function loadAreaNode(adcode, callback) {
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
                if (callback) {
                    callback(error);
                }
                console.error(error);
                return;
            }
            if (callback) {
                callback(null, areaNode);
            }
        });
    }

    switch2AreaNode(370200);
});


const MapFactory = function (_t) {

    let infoWindow = new AMap.InfoWindow({
        isCustom: true,
        draggable: true,  //是否可拖动
        offset: new AMap.Pixel(0, -31),
        content: ""
    });

    return {
        // 创建一个点
        creatOnePointMarker: function ({pLng, pLat, title, opt}) {
            return new AMap.Marker({
                position: new AMap.LngLat(pLng, pLat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: title,
                ...opt // extends options
            });
        },


        // 批量创建点
        createBatchPointMarker: function (data, opt = {}) {
            let greenOpt = {
                icon: '../../asset/mark_g.png'
            };

            return data.map(function (item) {
                const {id: pId, wd: pLat, jd: pLng, sbName: pName, isNew: pNew} = item;
                let pointMarker = MapFactory.creatOnePointMarker({pLng: pLng, pLat: pLat, title: pName});
                if (pNew) {
                    pointMarker = MapFactory.creatOnePointMarker({
                        pLng: pLng, pLat: pLat, title: pName, opt: {
                            ...greenOpt
                        }
                    });
                }
                pointMarker.pId = pId;
                pointMarker.pName = pName;
                return pointMarker;
            });
        },

        // 设置对象点 为节点为聚合点
        createMarkerClusterer: function (mapObj, markerList, option = {}) {
            mapObj.plugin(["AMap.MarkerClusterer"], function () {
                cluster = new AMap.MarkerClusterer(mapObj, markerList, option);
                // setMinClusterSize
            });
        },

        // 打开信息框
        openWindow: function(e) {
            infoWindow.open(_t, e.target.getPosition());//打开信息窗体
        },

        setContent: function(content){
            infoWindow.setContent(content);
        },

        // 关闭信息框
        closeWindow: function () {
            _t.clearInfoWindow();
        }

    };
}(bMap);

