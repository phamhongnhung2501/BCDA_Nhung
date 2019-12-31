let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testsmtpmail.h1@gmail.com',
        pass: 'gqtngdjxooiyvgmt'
    }
});

function sendEmail(to_email, template, content){
    try{
        let mailOptions = {
            from: 'testsmtpmail.h1@gmail.com',
            to: to_email,
            subject: 'Smart Farm',
            text: content
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err) throw err;
        });
    }catch(err){
        throw err
    }
}

module.exports = {
    sendEmail
};