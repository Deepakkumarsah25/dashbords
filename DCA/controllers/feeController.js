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
    organisationId: req.session.userId,
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

        const fees = await Fee.find({});

        const totalCollected = fees
            .filter(f => f.status === "Paid")
            .reduce((sum, f) => sum + Number(f.amount || 0), 0);

        const totalPending = fees
            .filter(f => f.status === "Pending")
            .reduce((sum, f) => sum + Number(f.amount || 0), 0);

        console.log("TOTAL COLLECTED =", totalCollected);
        console.log("TOTAL PENDING =", totalPending);

        res.json({
            success: true,
            fees,
            totalCollected,
            totalPending
        });

    } catch (err) {
        console.log(err);
        res.json({ success: false });
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