const User = require('../models/User.js');

//@desc Login user
//@route POST /api/v1/auth/login
exports.login = async (req, res, next) => {
  try {
    const {lineId, displayName, picture} = req.body;
    const user = await User.findOne({
      lineId: lineId
    });
    
    if(!user) {
      const created_user = await User.create({
        name:displayName,
        lineId:lineId,
        profile:picture,
        role:'user'
      });
    }
  } catch (err) {
    res.status(400).json({success: false, message: "bad req"});
    console.log(err);
  }
}