const { createJwtAccess, createJwtemail } = require("../lib/jwt");
const { registerService, loginService } = require('../services/authService')
const { dbCon } = require("./../connections");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const myCache = require("./../lib/cache");
const path = require("path");
const fs = require("fs");
const { token } = require("morgan");

let transporter = nodemailer.createTransport({
  service : "gmail",
  auth : {
    user : "funfungoodtime@gmail.com",
    pass : "voanbrxeknnugfcw",
  },
  tls : {
    rejectUnauthorized : false,
  },
});

module.exports = {
    
  register: async (req, res) => {
    try {
      const {
        data: userData,
      } = await registerService(req.body);

      let timecreated = new Date().getTime();
      const dataToken = {
        id: userData.id,
        username: userData.username,
        timecreated
      };

      let berhasil = myCache.set(userData.id, dataToken, 300);
      if(!berhasil){
        throw { message : "error caching"}
      }
      //   buat token email verified dan token untuk aksees
      const tokenAccess = createJwtAccess(dataToken);
      const tokenEmail = createJwtemail(dataToken);
      const host = process.env.NODE_ENV === 'production' ? 'http://namadomain.com' : 'http://localhost:3000'
      const link = `${host}/verified/${tokenEmail}`

      let filepath = path.resolve(__dirname, "../templates/templateEmailHTML.html")

      let htmlString = fs.readFileSync(filepath, "utf-8")
      
      const template = handlebars.compile(htmlString)

      const htmlToEmail = template({ username : userData.username, link,})


      //   kirim email
      transporter.sendMail({
        from : "prikitiw <funfungoodtime@gmail.com>",
        to : userData.email, //email usernya
        subject : "Tolong tolong tolong",
        // html : htmlToEmail,
        html : htmlToEmail
      })
      //   kriim data user dan token akses lagi untuk login
      res.set("x-token-access", tokenAccess);
      return res.status(200).send(userData);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message || error });
    }
  },
}