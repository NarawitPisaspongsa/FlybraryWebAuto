const User = require('../models/User.js');
const {sendTokenResponse} = require('../models/User.js')

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
      if (created_user) {
        return sendTokenResponse(created_user, 200, res);
      }
    }
  } catch (err) {
    res.status(400).json({success: false, message: "bad req"});
    console.log(err);
  }
}

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  
  // NOTE: JWT_COOKIE_EXPIRE should be set in environment variables (e.g., 30 days)
  // Default to 7 days if environment variable is not set
  const cookieExpireDays = process.env.JWT_COOKIE_EXPIRE ? parseInt(process.env.JWT_COOKIE_EXPIRE, 10) : 7;
  
  const options = {
    // Convert days to milliseconds
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000), 
    httpOnly: true,
    sameSite: 'Lax', // Recommended for modern web security
  };

  // console.log(options.expires); // Log is kept from original code
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    _id: user._id,
    name: user.name,
    role: user.role,
    token,
  });
};