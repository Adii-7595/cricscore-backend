const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Admin = require('../models/Admin');

async function seedAdmin() {

    try {

        await mongoose.connect(process.env.MONGO_URL);

        const existingAdmin = await Admin.findOne({
            username: process.env.ADMIN_USERNAME
        });

        if (existingAdmin) {

            console.log('✅ Admin already exists.');

            process.exit();

        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        const admin = new Admin({

            username: process.env.ADMIN_USERNAME,

            password: hashedPassword,

            role: 'SUPER_ADMIN'

        });

        await admin.save();

        console.log('✅ Super Admin created successfully.');

        process.exit();

    }

    catch (error) {

        console.error(error);

        process.exit(1);

    }

}

seedAdmin();