String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
};


const notifications = {
    "project": {
        "create": {},
        "delete": {},
        "update": {}
    },
    "work": {
        "create": {},
        "delete": {},
        "update": {}
    }
};

Object.keys(notifications).forEach(key_lv1 => {
    Object.keys(notifications[key_lv1]).forEach(key_lv2 => {
        notifications[key_lv1][key_lv2].title = `${key_lv2} ${key_lv1}`.capitalize();
        notifications[key_lv1][key_lv2].message = {};
        notifications[key_lv1][key_lv2].message.success = `${key_lv1} is successfully ${key_lv2}`.capitalize();
        notifications[key_lv1][key_lv2].message.error = `Error when ${key_lv2} ${key_lv1}`.capitalize();
    })
});


const message = {
    "notification": notifications
};

export default message;