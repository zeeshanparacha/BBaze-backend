const { template } = require("../email-templates/verification");

exports.resetPasswordParams = (email, name, token) => {
    const activationUrl = `${process.env.CLIENT_URL}/forget/${token}`
    return {
        Source: process.env.EMAIL_FROM,
        Destination: { ToAddresses: [email] },
        ReplyToAddresses: [process.env.EMAIL_FROM],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: template(activationUrl, name)
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: "Complete your registration"
            }
        }
    };
}