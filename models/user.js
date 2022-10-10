const { Schema, model } = require('mongoose');
const brcypt = require('bcryptjs');

// user Schema
const uesrSchema = new Schema({
    firstName: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    birthday: String,
    gender: String,
    phoneNumber: String,
    country: String,
    region: String,
    city: String,
    area: String,
    address: String,
    googleId: String,
    facebookId: String
});


// validate the password when user login
uesrSchema.methods.isValidatePassword = async function (password) {
    const user = this;
    const isValidate = await brcypt.compare(password, user.password);
    return isValidate;
}

const User = model('User', uesrSchema);
module.exports = User;