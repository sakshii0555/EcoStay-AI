const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        const newPassword = "Sakshi@050506";

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findOneAndUpdate(
            { email: "rawat.sakshi2006@gmail.com" },
            {
                password: hashedPassword,
                role: "admin",
            },
            { new: true }
        );

        if (!user) {
            console.log("Admin account not found.");
        } else {
            console.log("Admin password reset successfully!");
            console.log("Email:", user.email);
            console.log("Role:", user.role);
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error("RESET ERROR:", error);
    }
};

resetAdmin();