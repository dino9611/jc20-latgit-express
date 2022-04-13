const { dbCon } = require("./../connections");
const { createJwtAccess, createJwtemail } = require("../lib/jwt");
const myCache = require("./../lib/cache");
const crypto = require("crypto");

const hashPass = (password) => {
  // puripuriprisoner adalah kunci untuk hashing
  let hashing = crypto
    .createHmac("sha256", "puripuriprisoner")
    .update(password)
    .digest("hex");
  return hashing;
};

module.exports = {
  deactiveUser: async (req, res) => {
    const { userId } = req.body;
    let conn, sql;
    try {
      conn = await dbCon.promise().getConnection();
      // user dengan user id tertentu ada atau tidak
      sql = `select id from users where id = ?`;
      let [result] = await conn.query(sql, [userId]);
      if (!result.length) {
        throw { message: "user tidak ditemukan" };
      }
      sql = `update users set ? where id = ? `;
      let updateData = {
        isActivate: 0,
      };

      await conn.query(sql, [updateData, userId]);

      conn.release();
      return res.status(200).send({ message: "berhasil update data" });
    } catch (error) {
      conn.release();
      console.log(error);
      return res.status(500).send({ message: error.message || error });
    }
  },
};
