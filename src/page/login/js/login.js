if (INIT_Config.ENV=='dev_local'){
    $('#username').val(defaultInfo.account)
    $('#password').val(defaultInfo.password)
}

let img = document.getElementById('imgCode');

function changeCode() {
    let seed = Math.random()
    img.src = config.baseUrl + '/api/Account/vaildateLoginVcode?r=' + seed
}

$('#form').on('submit', function (e) {
    e.preventDefault();
    var loginInfo = utils.getJsonForFormDom('#form')
    loginInfo.password = md5(loginInfo.password)
    utils.ajax('/api/Account/login', loginInfo, 'post', function (res) {
        const {msg, result} = res;
        if (result) {
            window.location.href = '../home/home.html'
        }else {
            $('#J_Message p').text(msg)
            $('#J_Message').show()
            changeCode();
        }
    })
});

img.onclick = function () {
    changeCode();
}

changeCode();