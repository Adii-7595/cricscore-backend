const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({

                success: false,

                message: 'Username and password are required.'

            });

        }

        const admin = await Admin.findOne({ username });

        if (!admin) {

            return res.status(401).json({

                success: false,

                message: 'Invalid username or password.'

            });

        }

        const isPasswordValid = await bcrypt.compare(

            password,

            admin.password

        );

        if (!isPasswordValid) {

            return res.status(401).json({

                success: false,

                message: 'Invalid username or password.'

            });

        }

        const token = jwt.sign(

            {

                id: admin._id,

                username: admin.username,

                role: admin.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn: process.env.JWT_EXPIRES_IN

            }

        );

        res.status(200).json({

            success: true,

            message: 'Login successful.',

            token,

            admin: {

                id: admin._id,

                username: admin.username,

                role: admin.role

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

exports.getCurrentAdmin = async (req, res) => {

    try {

        const admin = await Admin.findById(req.admin.id).select(
            '-password -__v'
        );

        if (!admin) {

            return res.status(404).json({

                success: false,

                message: 'Admin not found.'

            });

        }

        res.status(200).json({

            success: true,

            admin

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};