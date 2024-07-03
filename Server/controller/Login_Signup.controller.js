const User = require('../models/users.model');
const Admit = require('../models/admit.model');
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

class UserController {
    async LoginCheck(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Incorrect email' });
            }
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const isAdmitted = await Admit.findById(user._id);
            const token = jwt.sign(
                {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    admitOrNot: !!isAdmitted,
                    likelist: user.likelist
                },
                '123456',
                { expiresIn: '8h' }
            );
            console.log(!!isAdmitted);
            res.status(200).json({ message: 'Login successful', token: token });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }

    async Signup(req, res) {
        const { firstname, lastname, email, password } = req.body;
        try {
            const user = await User.createUser({ firstname, lastname, email, password });
            res.status(201).json({ message: "User created sucessfully", user });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({ message: 'Error fetching users', error: error.message });
        }
    }


}

module.exports = new UserController();