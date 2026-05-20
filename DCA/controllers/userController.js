const User = require("../models/User");


// 🏢 General Save
const saveGeneralSettings = async (req, res) => {

    try {

        const {
            userId,
            instituteName,
            session,
            contactNumber,
            email,
            address
        } = req.body;

        const user = await User.findOneAndUpdate(
            { userId },
            {
                instituteName,
                session,
                contactNumber,
                email,
                address
            },
            {
                new: true
            }
        );

        res.json({
            success: true,
            message: "General settings saved",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


// 🔐 Change Password
const changePassword = async (req, res) => {

    try {

        const {
            userId,
            currentPassword,
            newPassword,
            twoFactorEnabled
        } = req.body;

        const user = await User.findOne({ userId });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });

        }

        // Password change
        if (currentPassword && newPassword) {

            const isMatch =
                await user.comparePassword(currentPassword);

            if (!isMatch) {

                return res.json({
                    success: false,
                    message: "Current password incorrect"
                });

            }

            user.password = newPassword;

        }

        // 2FA
        if (typeof twoFactorEnabled !== "undefined") {

            user.twoFactorEnabled = twoFactorEnabled;

        }

        await user.save();

        res.json({
            success: true,
            message: "Security updated"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};


module.exports = {
    saveGeneralSettings,
    changePassword
};