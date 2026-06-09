const Fee = require("../models/Fee");
const Student = require("../models/Student");
// SAVE or UPDATE
const saveFee = async (req, res) => {

    try {

        const {
            student,
            course,
            amount,
            date,
            status,
            editId
        } = req.body;

        if (!student || !course || !amount || !date) {

            return res.json({
                success: false,
                message: "All fields required"
            });

        }

        // UPDATE
        if (editId) {

            const updated = await Fee.findByIdAndUpdate(
                editId,
                {
                    student,
                    course,
                    amount,
                    date,
                    status
                },
                {
                    new: true
                }
            );

            return res.json({
                success: true,
                message: "Updated",
                data: updated
            });

        }

        // CREATE
        const newFee = new Fee({
            student,
            course,
            amount,
            date,
            status
        });

        await newFee.save();

        res.json({
            success: true,
            message: "Saved",
            data: newFee
        });

    } catch (err) {

        console.error(err);

        res.json({
            success: false,
            message: "Server Error"
        });

    }

};


// GET ALL DATA
const getFees = async (req, res) => {

    try {

        const fees = await Student.find({
            organisationId: req.session.userId
        }).sort({
            createdAt: -1
        });
        res.json({
            success: true,
            data: fees
        });

    } catch (err) {

        res.json({
            success: false
        });

    }

};


// DELETE
const deleteFee = async (req, res) => {

    try {

        const { id } = req.body;

        await Fee.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Deleted"
        });

    } catch (err) {

        res.json({
            success: false
        });

    }

};

module.exports = {
    saveFee,
    getFees,
    deleteFee
};