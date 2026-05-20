const Franchise = require("../models/Franchise");

const transporter = require("../config/mail");


// ======================================
// REGISTER FRANCHISE
// ======================================

const registerFranchise = async (req, res) => {

  try {

    // Save Franchise
    const franchise = await Franchise.create({
      ...req.body,
      status: "pending"
    });

    // Approve Link
    const approveLink =
      `http://localhost:3000/franchise/approve/${franchise._id}`;


    // ======================================
    // 1. MAIL TO USER
    // ======================================

    await transporter.sendMail({

      from: "anishkumar639421@gmail.com",

      to: franchise.email,

      subject: "RID Tech Franchise Registration Received",

      html: `

      <div style="font-family: Arial; padding:20px;">

        <h2 style="color:green;">
          Registration Successful ✅
        </h2>

        <p>Hello <b>${franchise.ownerName}</b>,</p>

        <p>
          Your franchise registration request has been received.
        </p>

        <p>
          Admin approval ke baad confirmation mail bheja jayega.
        </p>

        <hr>

        <p>
          <b>Franchise:</b>
          ${franchise.franchiseName}
        </p>

        <p>
          <b>Status:</b>
          Pending Approval
        </p>

      </div>

      `
    });


    // ======================================
    // 2. MAIL TO ADMIN
    // ======================================

    await transporter.sendMail({

      from: "anishkumar639421@gmail.com",

      to: "ridinternanishkumar2550@gmail.com",

      subject: "New Franchise Registration",

      html: `

      <div style="font-family: Arial; padding:20px;">

        <h1>New Franchise Registration</h1>

        <p>
          <b>Franchise Name:</b>
          ${franchise.franchiseName}
        </p>

        <p>
          <b>Owner Name:</b>
          ${franchise.ownerName}
        </p>

        <p>
          <b>Email:</b>
          ${franchise.email}
        </p>

        <p>
          <b>Contact:</b>
          ${franchise.contact}
        </p>

        <p>
          <b>Location:</b>
          ${franchise.location}
        </p>

        <p>
          <b>License Type:</b>
          ${franchise.licenseType}
        </p>

        <br>

        <a href="${approveLink}"
          style="
            background:green;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:5px;
            display:inline-block;
          ">
          APPROVE FRANCHISE
        </a>

      </div>

      `
    });


    // ======================================
    // RESPONSE
    // ======================================

    res.json({
      success: true,
      message: "Franchise Request Sent Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};




// ======================================
// APPROVE FRANCHISE
// ======================================

const approveFranchise = async (req, res) => {

  try {

    const franchise =
      await Franchise.findById(req.params.id);

    if (!franchise) {

      return res.send("Franchise Not Found");

    }

    // Update Status
    franchise.status = "approved";

    await franchise.save();


    // ======================================
    // 3. APPROVED MAIL TO USER
    // ======================================

    await transporter.sendMail({

      from: "anishkumar639421@gmail.com",

      to: franchise.email,

      subject: "Franchise Approved",

      html: `

      <div style="font-family: Arial; padding:20px;">

        <h2 style="color:green;">
          Franchise Approved 🎉
        </h2>

        <p>Hello <b>${franchise.ownerName}</b>,</p>

        <p>
          Your franchise has been approved successfully.
        </p>

        <hr>

        <p>
          <b>Franchise:</b>
          ${franchise.franchiseName}
        </p>

        <p>
          <b>Status:</b>
          Approved
        </p>

      </div>

      `
    });

    res.send("Approved Successfully");

  } catch (err) {

    console.log(err);

    res.send("Server Error");

  }
};

module.exports = {
  registerFranchise,
  approveFranchise
};