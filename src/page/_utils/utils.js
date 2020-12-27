let utils = function ($) {

    let baseurl = config.baseUrl; //ajax请求地址头部

    return {
        render: function (page_path, dom) {
            $.get(page_path, function (data) {
                $(dom).html(data);
            });
        },

        getRandomValue:function(arr){ // 从数组中取出一个随机值[0,1,2,3,4]
          return arr[Math.floor((Math.random()*arr.length))]  // 返回 0-4 中的随机一个值
        },

        formatDateReplaceT: function (dataStr) {
            return typeof dataStr == 'string' && dataStr.replace('T', ' ');
        },

        formatDateToYear: function (dataStr) {
            return typeof dataStr == 'string' && dataStr.substring(0,10);
        },

        getCurrentTime: function () {
            var time = new Date();
            var day = ("0" + time.getDate()).slice(-2);
            var month = ("0" + (time.getMonth() + 1)).slice(-2);
            var today = time.getFullYear() + "-" + (month) + "-" + (day);
            return today;
        },


        getJsonForFormDom: function (formDom) {
            let formObject = {};
            let formArray = $(formDom).serializeArray(); // 表单序列化
            $.each(formArray, function (i, item) {
                formObject[item.name] = item.value;
            });
            return formObject;
        },

        resetFromValue: function (formId = 'form') {
            document.getElementById(formId).reset();
        },

        renderTpl: function (tplId, data, dom) {
            var html = template(tplId, data);
            // console.log(html)
            // 将拼接好的字符串显示在页面中
            $(dom).html(html);
        },

        pGet: function (path, data = {}, callback) {
            // 创建Promise 容器
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: baseurl + path,
                    type: 'get',
                    data: data,
                    dataType: "JSON",
                    xhrFields: { withCredentials: true },
                    statusCode: {
                        401: function() {
                            window.location.href = '../login/login.html'
                        },
                    },
                    success: function (response) {
                        callback && callback(response.data)
                        resolve(response.data);
                    },
                    error: function (error) {
                        reject(error)
                    }
                });
            });
        },

        ajax: function (path, data, method, callback) {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: baseurl + path,
                    type: method,
                    contentType: 'application/json; charset=utf-8',
                    data: method.toUpperCase()=='POST'?JSON.stringify(data):data,
                    dataType: 'JSON',
                    xhrFields: { withCredentials: true },
                    statusCode: {
                        401: function() {
                            window.location.href = '../login/login.html'
                        },
                    },
                    success: function (response) {
                        callback && callback(response)
                        resolve(response);
                    },
                    error: function (error) {
                        alert('网络请求错误！');
                        reject(error)
                    }
                });
            })
        },
    };
}(jQuery);


