function setSbName(sbName) { // 设置设备名称
    $('.sbName').text(sbName);
}

function getPVideo(video) {
    if (video.sourceN && video.token)
        return video.sourceN + video.token;
    return '';
}

function renderSSSJTable(obj) {// 渲染实时数据表格数据
    Object.keys(obj).map((key, index) => {
        // console.log(key, obj[key], index) // key=>属性名  obj[key]=>属性值  index=>数组索引值
        var value = obj[key] || '';
        obj.jcsj = utils.formatDateToYear(obj.jcsj); // 格式化日期
        $(`#${key}`).text(value);
    });
}

function renderHJYJTable(data) {// 渲染环境预警表格数据
    if (data == null) {
        return;
    }
    var html = template('hjyjTpl', {data: data});
    // 将拼接好的字符串显示在页面中
    $('#hjyj_box').html(html);
}

function renderNQFXTable(data) {// 渲染农情况分析信息表格数据
    if (data == null) {
        return;
    }
    var html = template('nqfxTpl', {data: data});
    // 将拼接好的字符串显示在页面中
    $('#nqfx_box').html(html);
}

function renderNQFXQS_Graph(data) { // 渲染农情分析图表
    if (!data) return;
    Graph.renderLineGraph(data);
}

function renderXZFXTable(data) {// 渲染旬值分析表格数据
    if (data == null) {
        return;
    }
    var html = template('ndfxTpl', {data: data});

    // // 将拼接好的字符串显示在页面中
    $('#ndfx_box').html(html);
}

function renderTPYL_PIC({pic_url_list, point_name}) {// 渲染农情况分析信息表格数据
    if (pic_url_list == null) {
        return;
    }
    const no_pic = pic_url_list.length == 0;
    var html = template('picTpl', {data: pic_url_list, no_pic, pName: point_name});
    // // 将拼接好的字符串显示在页面中
    $('#pic_box').html(html);
}


function renderSSJC_Video(data) {// 渲染视频监控信息数据
    let str = ''
    if (data) {
        str = '<iframe style="width:100%;height:100%;border:1px solid #222;border-radius:4px;" src=' + data + '></iframe>'
    } else {
        str = '<img id="spjc_img" src="../../asset/none_video.png"/>'
    }

    $('#spjc_video').html(str);
}


const EnPoint = function (pName, SSSJTable, NQFXTable, NQFXQS_Graph, TPYL_PIC_DATA, SSJC_Video, HJYJTable, XZFXTable) {
    this.methods = [
        {
            params: pName,
            method: setSbName
        }, {
            params: SSSJTable,
            method: renderSSSJTable,
        }, {
            params: NQFXTable,
            method: renderNQFXTable,
        }, {
            params: NQFXQS_Graph,
            method: renderNQFXQS_Graph,
        }, {
            params: {
                pic_url_list: TPYL_PIC_DATA.pic_url_list,
                point_name: TPYL_PIC_DATA.point_name
            },
            method: renderTPYL_PIC,
        }, {
            params: SSJC_Video,
            method: renderSSJC_Video,
        }, {
            params: HJYJTable,
            method: renderHJYJTable,
        }, {
            params: XZFXTable,
            method: renderXZFXTable,
        }
    ];
};

EnPoint.prototype = {
    run: function () {
        for (let i = 0; i < this.methods.length; i++) {
            const item = this.methods[i];
            item.method(item.params);
        }
    },
};

const {getSQJCAndSJCJCount, getAllPointLocation, getOnePointSSSJ, getOnePointNQFX, getOnePointNQFXQS, getOnePointTPYL, getOnePointVideo, getOnePointHJYJ, getOnePointXZFX} = Service;

getSQJCAndSJCJCount(function ({data}) {
    // 墒情监测
    $('#sqjc_count').html(data[0]);
    $('#sqjc_city').html(data[1]);
    $('#sqjc_area').html(data[2]);

    // 数据采集量
    $('#sjcj_count').html(data[3]);
    $('#sjcj_city').html(data[4]);
    $('#sjcj_area').html(data[5]);
});


let sbxxObj = {}; // 首页接口数据集合
let onePointObj = {}; // 每个点点击时候的数据集合


getAllPointLocation(constants.MAP_POINT_COUNT).then(function (sbData) { // 获取所有点的位置信息
    sbxxObj.sbData = sbData;
}).then(function () {
    const arr = [0, 1, 2, 3, 4] // 随机坐标的数组
    const randomSb = utils.getRandomValue(arr);// 随机一个设备
    let {id: sbid, sbName} = sbxxObj.sbData[randomSb]; // 获取第一个点位信息
    sbxxObj.pId = sbid;
    sbxxObj.pName = sbName;
    return getOnePointVideo(sbid);
}).then(function ({data: video}) {
    sbxxObj.pVideo = getPVideo(video);
}).then(function () { // 获取图片预览数据
    return getOnePointTPYL(sbxxObj.pId);
}).then(function ({data: tpyl}) {
    sbxxObj.tpyl = tpyl;
    return getOnePointNQFX(); // 获取农情分析数据
}).then(function ({data: nqfx}) {// firstRender
    sbxxObj.nqfx = nqfx;
    return getOnePointSSSJ(sbxxObj.pId);  // 获取实时数据
}).then(function ({data: sssj}) {
    sbxxObj.sssj = sssj;
    return getOnePointNQFXQS(sbxxObj.pId);   //获取农情分析趋势(图表)数据
}).then(function (nqfxqs) {
    sbxxObj.nqfxqs = nqfxqs;
    return getOnePointHJYJ(sbxxObj.pId);   //获取环境预警
}).then(function ({data: hjyj}) {
    sbxxObj.hjyj = hjyj
    return getOnePointXZFX(sbxxObj.pId)
}).then(function ({data: xzfx}) {

    sbxxObj.markerList = MapFactory.createBatchPointMarker(sbxxObj.sbData); // 获取点的集合

    sbxxObj.markerList.map(function (pointMarKer) {
        pointMarKer.on('click', function (e) {
            let infoContent = "<div class='infoWindow'>" +
                "<img src='https://webapi.amap.com/images/close2.gif' onclick='MapFactory.closeWindow();'>"
                + "<ul >"
                + "<li>  <span>" + e.target.pName + "</span></li>"
                + "</ul>"
                + "<span class='triangle-down'></span>"
                + "</div>";


            MapFactory.setContent(infoContent)

            MapFactory.openWindow(e)

            return getOnePointSSSJ(pointMarKer.pId)
                .then(function ({data: p_sssj}) {
                    onePointObj.p_sssj = p_sssj;
                    return getOnePointNQFXQS(pointMarKer.pId);
                })
                .then(function (p_nqfxqs) {
                    onePointObj.p_nqfxqs = p_nqfxqs;
                    return getOnePointTPYL(pointMarKer.pId);
                })
                .then(function ({data: p_tpyl}) {
                    onePointObj.p_tpyl = p_tpyl;
                    return getOnePointVideo(pointMarKer.pId); // 获取视频信息
                }).then(function ({data: video}) {
                    onePointObj.p_video = video;
                    return getOnePointHJYJ(pointMarKer.pId);   //获取环境预警
                }).then(function ({data: p_hjyj}) {
                    onePointObj.p_hjyj = p_hjyj;
                    return getOnePointXZFX(pointMarKer.pId)
                }).then(function ({data: p_xzfx}) {
                    onePointObj.pVideo = getPVideo(onePointObj.p_video);
                    const point = new EnPoint(
                        pointMarKer.pName,
                        onePointObj.p_sssj[0],
                        null,
                        onePointObj.p_nqfxqs,
                        {
                            pic_url_list: onePointObj.p_tpyl,
                            point_name: pointMarKer.pName
                        },
                        onePointObj.pVideo,
                        onePointObj.p_hjyj,
                        p_xzfx
                    );
                    point.run();
                });
        });
    });

    const firstPoint = new EnPoint(sbxxObj.pName, sbxxObj.sssj[0], sbxxObj.nqfx, sbxxObj.nqfxqs, {
            pic_url_list: sbxxObj.tpyl,
            point_name: sbxxObj.pName
        }, sbxxObj.pVideo,
        sbxxObj.hjyj,
        xzfx
    );
    firstPoint.run();

    // 设置 聚和点
    /*    sbxxObj.markerClustererList = MapFactory.createMarkerClusterer(bMap, sbxxObj.markerList, {gridSize: 80, minClusterSize:3});
        bMap.add(sbxxObj.markerClustererList);*/

    bMap.add(sbxxObj.markerList);
});


