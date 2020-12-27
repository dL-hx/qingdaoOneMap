const INIT_Config = {
    // ENV: 'dev_local',
    ENV: 'prod',
};

// env: 'dev_local'| 'prod'
const config = (function (env) {
    const baseUrl = {
        dev_local: 'http://192.168.2.107:8018',
        prod: 'http://39.106.102.63:8018',
    };

    return {
        baseUrl: baseUrl[env]
    }
})('prod')