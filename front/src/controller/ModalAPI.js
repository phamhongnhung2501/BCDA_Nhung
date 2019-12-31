const ValidInput = require("../utils/ValidInput");

/**
 *
 * @param req
 * @param callback(err, result)
 * @err{code, message}
 * @code:
 * -> 1:
 * -> 2:
 * -> 3:
 * -> 4:
 * -> 5:
 * -> 6:
 * @constructor
 */
function ModalAPI(req, listMap, callback) {
    fetch(req.url, {
        method: ValidInput.isEmpty(req.method) ? "GET" : req.method,
        headers: ValidInput.isEmpty(req.headers) ? {} : req.headers,
        body: ValidInput.isEmpty(req.body) ? null : JSON.stringify(req.body)
    })
        .then(res => {
            console.log(res);
            
            if (!res.ok) {
                throw [res.status, res.statusText];
            }

            if(res.statusText === "No Content"){
                return "No Content";
            }
            return res.json()
        })
        .then(
            (result) => {
                if(result==="No Content"){
                    return callback(null, "No Content");
                } else {
                    if(ValidInput.isEmpty(listMap)){
                        return callback(null, result);
                    } else {
                        if(Array.isArray(listMap)){
                            let data = [];
                            result.map((result) => {
                                let element = JSON.parse(JSON.stringify(listMap[0]));
                                Object.keys(listMap[0]).forEach(key => {
                                    element[key] = result[listMap[0][key]];
                                });
                                data.push(element)
                            });
                            return callback(null, data);
                        } else {
                            let data = listMap;
                            Object.keys(listMap).forEach(key => {
                                data[key] = result[key];
                            });
                            return callback(null, data)
                        }
                    }
                }
            }
        )
        .catch(
            (error) => {
                console.log(error)
                if(error[0]!==undefined)
                    return callback(error);
                else
                    return callback("Failed to fetch")
            }
        )
}

module.exports = {
    ModalAPI: ModalAPI
};
