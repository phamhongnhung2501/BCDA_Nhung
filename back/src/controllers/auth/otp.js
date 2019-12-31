const otplib = require('otplib');
const fetch = require('node-fetch');

const configOTP = require('../../../config/otp');

otplib.authenticator.options = {
    algorithm: configOTP.algorithm,
    step: configOTP.step,
};

function generateOTP(phoneNumber, code){
    let secretKey = configOTP.key + phoneNumber + code;
    return otplib.authenticator.generate(secretKey);
}

function verifyOTP(token, phoneNumber, code){
    let secretKey = configOTP.key + phoneNumber + code;
    // console.log(otplib.authenticator.check(token, secretKey))
    return otplib.authenticator.check(token, secretKey);
}

async function sendOtpCode(phoneNumber) {
    try {
        let otpCode = generateOTP(phoneNumber);
        let params = {
            Phone: phoneNumber,
            Content: `Smart Farm verification code is ${otpCode}.This OTP expires in 60 seconds.`,
            ApiKey: "969B5AFFC5F21491FF7389A9B6884E",
            SecretKey: "084CC577CCAA15CF87E7151DC76CE5",
            Brandname: 'verify',
            SmsType: 2
        };

        let baseUrl = new URL("http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get");
        Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]));
        let result = await fetch(baseUrl, {method: 'GET'})
            .then(res => res.json())
            .then(json => json);
        console.log(result);
        return !(!result || result.CodeResult !== '100');
    } catch (err) {
        throw err
    }
}

module.exports={
    generateOTP,
    verifyOTP,
    sendOtpCode
};