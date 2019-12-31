/**
 * Return typical response for API request
 * @OrderPerforming
 *  STEP 1: Call module
 *  STEP 2: Call function in case
 *  STEP 3: Constructor
 *  STEP 4: Return res
 *  @Version v1.0.1
 */

const internals = {};
const debug = require('debug')('response:');

/**
 * Some cases of response
 * @example variable
 *          var str = '{ "name": "John Doe", "age": 42 }';
 *          var objectData = JSON.parse(str);
 *          var msg1 =    "Username or password does not matches user.";
 *          var msg2 =    "taiga.base.exceptions.WrongArguments";
 * @example 1xx 2xx
 *          response.created(res, objectData);
 * @example 3xx
 *          response.notModified(res);
 * @example 4xx
 *          response.badRequest(res, msg1, msg2);
 * @example 5xx: objectData->ignore msg
 *          response.badRequest(res, msg1, objectData);
 * @example 5xx: no objectData
 *          response.badRequest(res, msg1);
 */
module.exports = internals.Response = class extends Error {
    /* Most uses */
    // 1xx Informational response

    //200// 2xx Success
    static ok(res, objectData) {
        return new internals.Response(res, null, { statusCode: 200, objectData, ctor: internals.Response.ok });
    }
    //201
    static created(res, objectData) {
        return new internals.Response(res, null, { statusCode: 201, objectData, ctor: internals.Response.created }) ;
    }
    //202
    static accepted(res, objectData) {
        return new internals.Response(res, null, { statusCode: 202, objectData, ctor: internals.Response.accepted });
    }
    //204
    static noContent(res) {
        return new internals.Response(res, null, { statusCode: 204, ctor: internals.Response.noContent });
    }

    //304// 3xx Redirection
    static notModified(res) {
        return new internals.Response(res, null, { statusCode: 304, ctor: internals.Response.notModified });
    }

    //400// 4xx Client Errors unauthorized
    static badRequest(res, _error_message, _error_type) {
        return new internals.Response(res, {_error_message: _error_message, _error_type: _error_type}, { statusCode: 400, ctor: internals.Response.badRequest });
    }

    //401 unauthorized
    static unauthorized(res, _error_message, _error_type) {
        return new internals.Response(res, {_error_message: _error_message, _error_type: _error_type}, { statusCode: 401, ctor: internals.Response.Unauthorized });
    }

    //403
    static forbidden(res, _error_message, _error_type) {
        return new internals.Response(res, {_error_message: _error_message, _error_type: _error_type}, { statusCode: 403, ctor: internals.Response.forbidden });
    }
    //404
    static notFound(res, _error_message, _error_type) {
        return new internals.Response(res, {_error_message: _error_message, _error_type: _error_type}, { statusCode: 404, ctor: internals.Response.notFound });
    }
    //422
    static unprocessableEntity (res, objectData) {
        return new internals.Response(res, null, { statusCode: 422, objectData, ctor: internals.Response.unprocessableEntity });
    }
    //422
    static badData(res, _error_message, _error_type) {
        return new internals.Response(res, {_error_message: _error_message, _error_type: _error_type}, { statusCode: 422, ctor: internals.Response.badData });
    }

    //500// 5xx Server Errors
    static internal(res, message, objectData, statusCode = 500) {
        return new internals.Response(res, {_error_message: message}, { statusCode: statusCode, objectData, ctor: internals.Response.internal });
    }

    // Main
    static [Symbol.hasInstance](instance) {
        return internals.Response.isError(instance);
    }

    constructor(res, message, options = {}) {
        super();
        const { statusCode = 500, objectData = null, ctor = internals.Response } = options;
        if (message && message._error_message && message._error_message.message)
            message._error_message = message._error_message.message;
        debug(objectData);
        debug(message);
        debug(ctor);
        let body = objectData;
        if (!objectData)
            body = message;
        res.status(statusCode);
        return res.send(body);
    }
};
