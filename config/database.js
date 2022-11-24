require('dotenv').config()

module.exports = {
    hrPool: {
      user: process.env.ORCLUSER,
      password: process.env.ORCLPASSWORD,
      connectString: process.env.ORCLCONNECTIONSTRING,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    }
  };