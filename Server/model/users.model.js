const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserList = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserList.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserList.statics.createUser = async function (userData) {
    try {
        const user = new this(userData);
        await user.save();
        console.log('New user created:', user);
        return user;
    } catch (error) {
        console.log('wrong', error);
        throw error;
    }
}

UserList.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('UserList', UserList, 'UserList')