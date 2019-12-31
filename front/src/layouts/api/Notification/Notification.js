const config_api = require("../../../config/config").config_api;
const ValidInput = require("../../../utils/ValidInput");

function getNotification(callback) {
    try {
        /* Check valid input */
        const userInfo = localStorage.getItem("userInfo");
        if (ValidInput.isEmpty(userInfo))
            return callback("Not user changed");
        /**/
        fetch(config_api.notification, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + JSON.parse(userInfo).token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    throw res;
                }
            })
            .then(
                (result) => {
                    return callback(false, result.objects)
                },
                (error) => {
                    return callback(error);
                }
            )
    } catch (e) {
        return callback(e);
    }
}

module.exports = {
    getNotification: getNotification
}