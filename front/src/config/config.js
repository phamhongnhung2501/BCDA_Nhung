const config_network = {
    //  "host": "http://iot-demo.tinasoft.com.vn",
    host: "http://192.168.1.250",
    port: "8001",
};
const config_socket = {
    ip: "http://192.168.1.250:8001",
};

const api_path = config_network.host + ":" + config_network.port + "/api/v1/";

const config_api = {
    path: api_path,
    // Auth
    signin: api_path + "auth",
    register: api_path + "auth/register",
    verify: api_path + "auth/verify",
    // project
    project: api_path + "information",
    // list seeds
    seed: api_path + "seeds",
    // list gateways
    gateway: api_path + "seeds/gateway",
    // Getdata
    data: api_path + "data",
    //Task
    task: api_path + "tasks",
    task_status: api_path + "task-statuses",
    task_attachments: api_path + "tasks/attachments",
    // Admin
    admin: api_path + "users",
    // Notification
    notification: api_path + "web-notifications",
    // member
    memberships: api_path + "memberships",
    roles: api_path + "roles",
};

module.exports = {
    config_network: config_network,
    config_api: config_api,
    config_socket: config_socket,
};
