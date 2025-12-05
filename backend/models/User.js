const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
        unique: true,
        maxlength: [300, 'Name too long.'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    lineId: {
        type: String,
        required: [true, 'Sign in with line please']
    },
    profile: {
        type: String,
        default: 'https://drive.google.com/file/d/1ia9j4tSsduolkj8aa-PxHpEkCvj91QOV/view?usp=sharing'
        
    }
})

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
    email: user.email,
    role: user.role,
    token,
  });
};

module.exports = mongoose.model('User', userSchema);
exports.sendTokenResponse = sendTokenResponse;