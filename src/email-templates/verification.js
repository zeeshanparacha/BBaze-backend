const template = (url, name) => {
    return `<div style="background: #f2f3f5; padding: 30px; font-family: 'Roboto', sans-serif;">
                  <div style="width: 536px; height: auto; background: #272C33; border-radius: 16px; margin: 0 auto;">
                      <div style="border-bottom: #999999 solid 2px; padding: 30px; text-align: center;">
                          <img style="height: 130px; margin-right: 15px;" src="https://bbaze.s3.us-west-2.amazonaws.com/download.png" />
                      </div>
  
                      <div style="margin-top: 30px; padding: 25px 30px; letter-spacing: 1px;">
                          <div style="font-style: normal; font-weight: normal; font-size: 36px; text-align: center; color: #999999; margin: 25px 0 15px 0; letter-spacing: 0.01em;">Hi, ${name}</div>
                          <p style="margin-top: 15px; font-size: 14px; text-align:center; color: #999999; opacity: 0.75; line-height: 20px; letter-spacing: 0.01em;">Nous essayons de vérifier votre adresse e-mail utilisée dans votre compte BBaze.</p>
                          <div style="margin: 32px 0; text-align: center; padding: 15px;">
                              <a href="${url}" style="text-decoration: none; background: #C86838; border-radius: 8px; padding: 15px 25px; font-style: normal; font-weight: 500; font-size: 14px; color: #ffffff; letter-spacing: 0.01em;">Confirm Email Address</a>
                          </div>
  
                          <div style="padding: 0px 0 32px 0;">
                              <p style="font-style: normal; font-weight: normal; font-size: 13px; line-height: 20px; color: #999999; opacity: 0.75; letter-spacing: 0.01em;">Si le lien ci-dessus n'a pas fonctionné pour une raison quelconque, vous pouvez copier et coller le lien ci-dessous dans votre navigateur</p>
                              <div style="background: #c868381a; border-radius: 8px; margin: 25px 0; font-weight: normal; font-size: 12px; line-height: 16px; text-align: center;  text-align: center; padding: 15px;">
                                  <a style="color: #c86838; letter-spacing: 0.01em;">${url}</a>
                              </div>
                              <p style="font-style: normal; font-weight: normal; font-size: 13px; line-height: 20px; color: #999999; opacity: 0.75; letter-spacing: 0.01em;">Une fois que vous avez vérifié avec succès en utilisant le lien ci-dessus, vous serez redirigé vers BBaze.</p>
                          </div>
                      </div>
                  </div>
  
              </div>`
}
module.exports = { template };