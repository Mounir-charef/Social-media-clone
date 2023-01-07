import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER USER */

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


/* LOGIN USER */

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({error: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({error: "Invalid credentials"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        delete user.password;
        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}