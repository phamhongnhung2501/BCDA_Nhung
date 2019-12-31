const jwt = require('jsonwebtoken');

const User = require('../user/models/users');
const response = require('../base/response');
const serializer = require('../base/serializer');
const configJWT = require('../../../config/jwt');
const otp = require('./otp');
const mail = require('../base/mail');

/** Register */
async function register(req, res){
    try {
        let info = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
            gender: req.body.gender,
            address: req.body.address
        };
        let number_of_user = await User.find().countDocuments();
        if(number_of_user === 0) info.is_admin = true;
        let check_email = await User.findOne({email:req.body.email});
        if(check_email) return response.badRequest(res, 'Email is already in use.');
        let user = await User.create(info);
        console.log(otp.generateOTP(info.phone_number, user.code));
        // await otp.sendOtpCode(info.phone_number);
        return response.created(res, {_created_message:`Your account has been successfully created!`});
    } catch (err) {
        return response.internal(res, err);
    }
}

/** Login */
async function login(req, res){
    try{
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password) return response.badRequest(res, 'Invalid login data!!!');

        let user = await User.findOne({email: email},{__v:0});
        if(!user) return response.badRequest(res,"Email doesn't exists!!!");
        // if(!user.is_active) return response.forbidden(res, "User isn't active!!!");
        user.comparePassword(password, async (err, isMatch) => {
            if (err || !isMatch) return response.badRequest(res, 'Wrong password!!!');
            const auth_token = jwt.sign({_id: user._id}, configJWT.secret,  {expiresIn: configJWT.tokenLife});
            await User.findByIdAndUpdate(user._id, {last_login: Date.now()}, { new: true });
            let user_info = Object.assign({auth_token}, user.toJSON());
            let full_user = await serializer.convertOutput(user_info);
            mail.sendEmail(req.body.email, "login", "Quach Van Vung")
            return response.ok(res, full_user);
        });
    }catch (err) {
        return response.internal(res, err);
    }
}

/**
 * @Description Middleware check authentication!
 * 1.Get token by req.header.authorization
 * 2.Verify token
 * 3.(correct) next() || (err) return(err)
 * @param req
 * @param res
 * @param next
 */
function authentication(req, res, next){
    try{
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!token) return response.unauthorized(res,'Auth token is not supplied');
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        jwt.verify(token, configJWT.secret, async (err, decoded) => {
            if (err) return response.unauthorized(res,'Token is not valid');
            else {
                req.user = await User.findById(decoded._id, {__v: 0});
                next();
            }
        });
    }catch(err){
        return response.internal(res, err);
    }
}

/**OTP*/
async function verifyOtp(req, res){
    try{
        let user = await User.findOne({email: req.body.email},{code:1, phone_number:1});
        if(!user) return response.badData(res, "User doesn't exist!!!");
        if(!otp.verifyOTP(req.body.code, user.phone_number, user.code)) return response.badData(res, "OTP Code is wrong or outdated!!!");
        await User.findOneAndUpdate({email: req.body.email},{is_active: true});
        response.noContent(res);
    }catch (err) {
        return response.internal(res, err);
    }
}

async function refreshOTP(req, res){
    try {
        let user = await User.findOneAndUpdate({email: req.body.email},{code: Date.now()},{new:true});
        if(!user) return response.badData(res, "User doesn't exist!!!");
        if(user.is_active) return response.unprocessableEntity(res,{message: "User has active!!!"});
        let OTP = otp.generateOTP(user.phone_number, user.code);
        response.ok(res, {OTP: OTP})
        // let OTP = otp.sendOtpCode(user.phone_number)
        // response.noContent(res);
    }catch (err) {
        response.internal(res, err)
    }
}

module.exports = {
    register,
    login,
    authentication,
    verifyOtp,
    refreshOTP
};