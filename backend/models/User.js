const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
        unique: true,
        maxlength: [300, 'For Shisui Meikyou'],
    },
    lineID: {
        type: String,
        required: [true, 'Sign up with line please']
    },
    profile: {
        type: String,
        default: 'https://drive.google.com/file/d/1ia9j4tSsduolkj8aa-Px HpEkCvj91QOV/view?usp=sharing'
    }
})

module.exports = mongoose.model('User', userSchema);