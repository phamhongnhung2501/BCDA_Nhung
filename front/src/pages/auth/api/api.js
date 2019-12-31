const config_api = require("../../../config/config").config_api;
const axios = require('axios');

function login(email, password, callback) {
    axios({
        url: config_api.signin,
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        data: {
            "email": email,
            "password": password
        }
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response);
                // Lỗi khi server nhận được request và không xử lý được, các lỗi này có mã lỗi ngoài dải 2xx
                return callback(error.response)
            } else if (error.request) {
                // Lỗi khi request được tạo ra nhưng server không hồi đáp, vd : net::ERR_CONNECTION_TIMED_OUT
                return callback("Please check your internet connection to server");
            } else {
                console.log(error.message);
                // Lỗi khi thiết lập request status
                return callback(error.message)
            }
        });
}

function register(data, callback) {
    console.log(data);

    axios({
        url: config_api.register,
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
        data: {
            "email": data.email,
            "full_name": data.full_name,
            "password": data.password,
            "phone_number": data.phone_number,
        }
    })
        .then(result => {
            console.log(result);

            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}
function verify(code, mail, callback) {
    console.log(mail);

    axios({
        url: config_api.verify,
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        data: {
            "email": mail,
            "code": code,
        }
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}
function activeAccount(request, callback) {
    axios({
        method: 'POST',
        url: config_api.verify,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "token": request.token,
            "email": request.email,
        }
    })
        .then(result => {
            return callback(false, result.data)
        })
        .catch(error => {
            if (error.response) {
                return callback(error.response)
            } else if (error.request) {
                return callback("Please check your internet connection to server");
            } else {
                return callback(error.message)
            }
        });
}


module.exports = {
    login: login,
    register: register,
    activeAccount: activeAccount,
    verify: verify,
};