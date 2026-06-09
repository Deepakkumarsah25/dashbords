const DCACertificatedApplication = require("../models/Application");
const nodemailer = require("nodemailer");
// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});
const calculateGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C+";
  if (marks >= 40) return "C";
  if (marks >= 33) return "D";
  return "F";
};
// Send email function
const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};


 const createApplication = async (req, res) => {
    const marks = Number(req.body.marks);

req.body.grade = calculateGrade(marks);
    console.log("BODY =>", req.body);

    const year = new Date().getFullYear();

req.body.certificateNo =
  "RID/" + year + "/" + Math.floor(Math.random() * 9999).toString().padStart(4, "0");

req.body.enrollNo =
  "RID/" + year + "/" + Math.floor(Math.random() * 9999).toString().padStart(4, "0");

req.body.rollNo =
  Math.floor(Math.random() * 99999999).toString().padStart(8, "0");
    try {
                const photoUrl = req.file
            ? "/uploads/" + req.file.filename
            : "";

        const data = await DCACertificatedApplication.create({
            ...req.body,
            photoUrl

        });
        
        // Send confirmation email to user
        const userEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4CAF50;">Application Submitted Successfully!</h2>
                <p>Dear ${data.studentName},</p>
                <p>Your certificate application has been received successfully.</p>
                
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3>Application Details:</h3>
                    <p><strong>Certificate No:</strong> ${data.certificateNo}</p>
                    <p><strong>Registration No:</strong> ${data.registrationNo}</p>
                   <p><strong>Enrollment No:</strong> ${data.enrollNo}</p>
                    <p><strong>Roll No:</strong> ${data.rollNo}</p>
                    <p><strong>Course:</strong> ${data.courseName}</p>
                    <p><strong>Status:</strong> Pending Verification</p>
                </div>
                
                <p>Your application is currently pending verification. You will receive another email once your certificate is verified and ready for download.</p>
                
                <p>Thank you,<br>DCA Certificate Team</p>
            </div>
        `;
        
        await sendEmail(data.email, 'Certificate Application Submitted Successfully', userEmailHtml);
        
        // Send email to ADMIN with Verify button
        const adminEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #FF5722;">📋 New Certificate Application</h2>
                <p><strong>⚠️ Action Required:</strong> A new certificate application needs verification.</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">Student Details:</h3>
                    <p><strong> Student Name:</strong> ${data.studentName}</p>
                    <p><strong> Father's Name:</strong> ${data.fatherName}</p>
                    <p><strong> Email:</strong> ${data.email}</p>
                    <p><strong> Course:</strong> ${data.courseName}</p>
                    <p><strong> Grade:</strong> ${data.grade} (${data.marks}%)</p>
                    <p><strong> Certificate No:</strong> ${data.certificateNo}</p>
                    <p><strong> Admission Date:</strong> ${new Date(data.admissionDate).toLocaleDateString()}</p>
                    <p><strong> Completion Date:</strong> ${new Date(data.completionDate).toLocaleDateString()}</p>
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${process.env.ADMIN_VERIFY_URL}/verify/${data._id}" 
                       style="background-color: #4CAF50; 
                              color: white; 
                              padding: 14px 35px; 
                              text-decoration: none; 
                              border-radius: 5px;
                              font-size: 16px;
                              font-weight: bold;
                              display: inline-block;
                              box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                        ✅ VERIFY CERTIFICATE
                    </a>
                </div>
                
                <p style="color: #666; font-size: 12px;">Or click this link: ${process.env.ADMIN_VERIFY_URL}/verify/${data._id}</p>
                
                <hr>
                <small style="color: #999;">Admin Panel | DCA Certificate System</small>
            </div>
        `;
        
        // Send to admin email (configure in .env)
        await sendEmail(process.env.ADMIN_EMAIL, ' New Certificate Application - Action Required', adminEmailHtml);
        
        res.status(200).json({
            success: true,
            message: "Application submitted successfully. Admin has been notified.",
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
};

// Verify application via button click (GET request from email)
const verifyApplicationViaEmail = async (req, res) => {
    try {
        const { id } = req.params;
        
        const application = await DCACertificatedApplication.findByIdAndUpdate(
            id,
            { status: "verified" },
            { new: true }
        );
        
        if (!application) {
            return res.status(404).send(`
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                    <h2 style="color: #f44336;">❌ Error!</h2>
                    <p>Application not found!</p>
                </div>
            `);
        }
        
        // Create download link for user
const downloadLink =
`${process.env.BACKEND_URL}/api/application/download-certificate/${encodeURIComponent(application.certificateNo)}`;
        
        // Send verification and download email to USER
        const userEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2196F3;"> Certificate Verified Successfully! 🎉</h2>
                <p>Dear ${application.studentName},</p>
                <p>Congratulations! Your certificate has been verified and is now ready for download.</p>
                
                <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h3>Certificate Details:</h3>
                    <p><strong>Student Name:</strong> ${application.studentName}</p>
                    <p><strong>Father's Name:</strong> ${application.fatherName}</p>
                    <p><strong>Course:</strong> ${application.courseName}</p>
                    <p><strong>Grade:</strong> ${application.grade} (${application.marks}%)</p>
                    <p><strong>Certificate No:</strong> ${application.certificateNo}</p>
                    <p><strong>Issue Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${downloadLink}" 
                       style="background-color: #4CAF50; 
                              color: white; 
                              padding: 12px 30px; 
                              text-decoration: none; 
                              border-radius: 5px;
                              display: inline-block;
                              font-weight: bold;">
                        📥 DOWNLOAD YOUR CERTIFICATE
                    </a>
                </div>
                
                <p>Or copy this link: ${downloadLink}</p>
                
                <p>Best regards,<br>DCA Certificate Team</p>
                
                <hr>
                <small style="color: #666;">This is an automated message. Please do not reply to this email.</small>
            </div>
        `;
        
        await sendEmail(application.email, 'Your Certificate is Ready for Download!', userEmailHtml);
        
        // Return success page to admin
        res.send(`
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
                <div style="background: white; max-width: 500px; margin: 50px auto; padding: 40px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <h2 style="color: #4CAF50;">✅ Certificate Verified Successfully!</h2>
                    <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Student Name:</strong> ${application.studentName}</p>
                        <p><strong>Course:</strong> ${application.courseName}</p>
                        <p><strong>Email:</strong> ${application.email}</p>
                    </div>
                    <p style="color: #666;">Download link has been sent to the student's email address.</p>
                    <p><strong>Status:</strong> <span style="color: #4CAF50;">✓ Verified</span></p>
                    <hr>
                    <a href="${process.env.ADMIN_PANEL_URL}" style="color: #667eea; text-decoration: none;">← Back to Admin Panel</a>
                </div>
            </div>
        `);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(`
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h2 style="color: #f44336;">❌ Verification Failed!</h2>
                <p>Error: ${error.message}</p>
                <a href="${process.env.ADMIN_PANEL_URL}" style="color: #667eea;">Go to Admin Panel</a>
            </div>
        `);
    }
};

// Get application by certificate number
const getApplicationByCertificateNo = async (req, res) => {
    try {
        const { certificateNo } = req.params;
        const application = await DCACertificatedApplication.findOne({ certificateNo });
        
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }
        
        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all pending applications (for admin API)
const getPendingApplications = async (req, res) => {
    try {
        const applications = await DCACertificatedApplication.find({ status: "pending" });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all verified applications
const getVerifiedApplications = async (req, res) => {
    try {
        const applications = await DCACertificatedApplication.find({ status: "verified" });
        res.status(200).json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const downloadCertificate = async (req, res) => {
    try {
        const { certificateNo } = req.params;
        
        console.log(`Attempting to download certificate: ${certificateNo}`); // Debug log
        
        const application = await DCACertificatedApplication.findOne({
            certificateNo: certificateNo
        });

        console.log("Application found:", application ? "Yes" : "No"); // Debug log

        if (!application) {
            return res.status(404).send(`
                <html>
                <head>
                    <title>Certificate Not Found</title>
                    <style>
                        body { font-family: Arial; text-align: center; padding: 50px; background: #1a1a2e; }
                        .error { color: red; background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: auto; }
                        button { background: #1a2a6e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h1>❌ Certificate Not Found</h1>
                        <p>Certificate number: ${certificateNo}</p>
                        <p>Please check the certificate number and try again.</p>
                        <button onclick="window.history.back()">Go Back</button>
                    </div>
                </body>
                </html>
            `);
        }

        if (application.status !== "verified") {
            return res.status(403).send(`
                <html>
                <head>
                    <title>Certificate Not Verified</title>
                    <style>
                        body { font-family: Arial; text-align: center; padding: 50px; background: #1a1a2e; }
                        .warning { color: orange; background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: auto; }
                        button { background: #1a2a6e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="warning">
                        <h1>⚠️ Certificate Not Verified Yet</h1>
                        <p>Your certificate is pending verification.</p>
                        <p><strong>Student:</strong> ${application.studentName}</p>
                        <p><strong>Status:</strong> ${application.status}</p>
                        <p>You will receive an email when your certificate is verified.</p>
                        <button onclick="window.history.back()">Go Back</button>
                    </div>
                </body>
                </html>
            `);
        }

        // Helper function to format date
        const formatDateDMY = (dateStr) => {
            if(!dateStr) return '';
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const date = new Date(dateStr);
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        };

        const formattedStart = formatDateDMY(application.admissionDate);
        const formattedEnd = formatDateDMY(application.completionDate);
        const formattedIssue = formatDateDMY(new Date());
        const photoHtml = application.photoUrl ? `<img src="${application.photoUrl}" alt="Student Photo">` : '<span>No Photo</span>';
        
        // Institute logo URL - change this to your institute logo
        const INSTITUTE_LOGO_SRC = "/assets/images/ridtechlogo.png";
        const logoHtml = `<img src="${INSTITUTE_LOGO_SRC}" alt="Institute Logo" style="width:70px;height:70px;border-radius:50%;object-fit:cover;">`;
        const WEBSITE_URL = "www.ridtech.in";

        // Send HTML certificate page with beautiful UI
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate - ${application.studentName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Times New Roman', Times, serif; padding: 20px; }
          .certificate-wrapper { width: 960px; background: #1a2a6e; padding: 12px; border-radius: 4px; box-shadow: 0 0 60px rgba(0,0,0,0.6); }
          .certificate { background: #fff; position: relative; padding: 0; overflow: hidden; }
          .border-outer { border: 3px solid #1a2a6e; margin: 8px; position: relative; }
          .border-inner { border: 1.5px solid #c8a84b; margin: 4px; padding: 18px 24px 20px; position: relative; }
          .corner { position: absolute; width: 55px; height: 55px; z-index: 10; }
          .corner svg { width: 100%; height: 100%; }
          .corner.tl { top: -2px; left: -2px; }
          .corner.tr { top: -2px; right: -2px; transform: scaleX(-1); }
          .corner.bl { bottom: -2px; left: -2px; transform: scaleY(-1); }
          .corner.br { bottom: -2px; right: -2px; transform: scale(-1,-1); }
          .reg-bar { text-align: center; margin-bottom: 8px; }
          .reg-bar span { background: #1a2a6e; color: #fff; font-size: 12px; font-weight: bold; padding: 2px 18px; letter-spacing: 0.5px; }
          .header-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px; }
          .logo-area { display: flex; flex-direction: column; align-items: center; width: 120px; flex-shrink: 0; }
          .logo-circle { width: 80px; height: 80px; border: 2px solid #1a2a6e; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff; overflow: hidden; }
          .logo-sub { font-size: 8.5px; color: #333; text-align: center; margin-top: 4px; }
          .center-header { flex: 1; text-align: center; padding: 0 10px; }
          .institute-title { font-size: 58px; font-weight: 900; color: #cc0000; letter-spacing: 8px; line-height: 1; margin-bottom: 2px; font-style: italic; text-shadow: 2px 2px 0 rgba(180,0,0,0.15); }
          .location-bar { display: inline-block; background: #cc0000; color: #fff; font-size: 13px; font-weight: bold; padding: 3px 20px; letter-spacing: 1px; margin-bottom: 4px; }
          .iso-text { font-size: 12px; color: #333; margin-bottom: 6px; }
          .cert-title-bar { display: inline-block; background: #1a2a6e; color: #fff; font-size: 14px; font-weight: bold; padding: 4px 28px; letter-spacing: 2px; position: relative; }
          .cert-title-bar::before, .cert-title-bar::after { content: '◄'; position: absolute; top: 50%; transform: translateY(-50%); color: #fff; font-size: 10px; }
          .cert-title-bar::before { left: 6px; }
          .cert-title-bar::after { right: 6px; content: '►'; }
          .iso-badge { width: 90px; height: 90px; flex-shrink: 0; }
          .cert-no { font-size: 12px; color: #333; margin-bottom: 10px; }
          .cert-no span { color: #cc0000; font-weight: bold; }
          .divider { border: none; border-top: 1px solid #c8a84b; margin: 8px 0; }
          .body-row { display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap; }
          .main-content { flex: 1; min-width: 200px; }
          .certify-text { text-align: center; font-size: 14px; color: #333; margin-bottom: 4px; }
          .student-name {font-family: Arial, sans-serif;  font-size: 46px; color: #222; text-align: center; margin: 4px 0 2px; line-height: 1.1; }
          .name-underline { border-bottom: 1px solid #555; margin: 0 40px 10px; }
          .father-row { font-size: 13px; color: #333; margin-bottom: 4px; display: flex; align-items: center; flex-wrap: wrap; }
          .father-row .label { min-width: 30px; }
          .father-row .val { border-bottom: 1px solid #888; flex: 1; padding-left: 6px; font-weight: bold; }
          .completed-text { font-size: 13px; color: #333; text-align: center; margin: 8px 0 4px; }
          .course-title { font-size: 15px; color: #cc0000; font-weight: bold; text-align: center; margin-bottom: 8px; }
          .date-row { display: flex; align-items: center; font-size: 13px; color: #333; margin-bottom: 6px; gap: 6px; flex-wrap: wrap; justify-content: center; }
          .date-row .date-val { border-bottom: 1px solid #888; min-width: 90px; padding: 0 4px; font-weight: bold; text-align: center; }
          .marks-row { display: flex; align-items: center; font-size: 13px; color: #333; margin-bottom: 8px; gap: 4px; flex-wrap: wrap; justify-content: center; }
          .marks-row .val-box { border-bottom: 1px solid #888; min-width: 42px; text-align: center; font-weight: bold; padding: 0 4px; }
          .wish-text { font-size: 13px; color: #333; text-align: center; margin-bottom: 14px; }
          .side-info { width: 175px; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
          .photo-box { width: 110px; height: 130px; border: 2px solid #1a2a6e; background: #b0c8e8; display: flex; align-items: center; justify-content: center; color: #666; font-size: 11px; overflow: hidden; margin-bottom: 8px; }
          .photo-box img { width: 100%; height: 100%; object-fit: cover; }
          .info-table { font-size: 11px; color: #333; line-height: 1.8; text-align: right; width: 100%; }
          .info-table td { padding: 2px 0; }
          .info-table .label { font-weight: normal; }
          .info-table .val { font-weight: bold; color: #1a2a6e; }
          .qr-area { text-align: center; margin-top: 5px; }
          .qr-scan-text { font-size: 9px; color: #555; margin-top: 2px; }
          .signatures { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 4px; padding: 0 10px; gap: 20px; flex-wrap: wrap; }
          .sig-block { text-align: center; flex: 1; min-width: 150px; }
          .sig-line { border-top: 1px solid #555; width: 80%; margin: 10px auto 4px; }
          .sig-name { font-size: 11.5px; font-weight: bold; color: #333; }
          .sig-sub { font-size: 10.5px; color: #555; }
          .bottom-curve { height: 32px; background: linear-gradient(135deg, #b8922a 0%, #f0d060 40%, #c8a84b 60%, #8a6820 100%); clip-path: ellipse(55% 100% at 50% 100%); margin: 0 -4px -4px; }
          .verify-footer { text-align: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid #c8a84b; }
          .verify-footer .website-url { font-size: 14px; font-weight: bold; color: #1a2a6e; display: inline-block; background: #f0f2f5; padding: 8px 20px; border-radius: 30px; margin-bottom: 8px; }
          .verify-footer .verify-text { font-size: 11px; color: #555; margin-top: 5px; }
          .verify-footer i { color: #c8a84b; }
          @media (max-width: 700px) { .body-row { flex-direction: column; align-items: center; } .side-info { align-items: center; width: 100%; } .info-table { text-align: center; } .photo-box { align-self: center; } .signatures { flex-direction: column; align-items: center; gap: 15px; } .sig-block { width: 100%; } .institute-title { font-size: 40px; letter-spacing: 4px; } .student-name { font-size: 32px; } }
          @media print { body { background: white; padding: 0; } .certificate-wrapper { box-shadow: none; } .no-print { display: none; } }
        </style>
        </head>
        <body>
        <div class="certificate-wrapper">
          <div class="certificate">
            <div class="border-outer">
              <div class="border-inner">
                <div class="corner tl"><svg viewBox="0 0 60 60"><path d="M2,2 L58,2 L58,10 L10,10 L10,58 L2,58 Z" fill="#1a2a6e" opacity="0.15"/><path d="M2,2 L20,2 L20,4 L4,4 L4,20 L2,20 Z" fill="#c8a84b"/><circle cx="8" cy="8" r="4" fill="#c8a84b"/><path d="M2,2 Q30,2 30,30 Q30,2 58,2" stroke="#c8a84b" stroke-width="1.5" fill="none"/><path d="M2,2 Q2,30 30,30 Q2,30 2,58" stroke="#c8a84b" stroke-width="1.5" fill="none"/><rect x="1" y="1" width="22" height="2" fill="#c8a84b"/><rect x="1" y="1" width="2" height="22" fill="#c8a84b"/></svg></div>
                <div class="corner tr"><svg viewBox="0 0 60 60"><path d="M2,2 L58,2 L58,10 L10,10 L10,58 L2,58 Z" fill="#1a2a6e" opacity="0.15"/><path d="M2,2 L20,2 L20,4 L4,4 L4,20 L2,20 Z" fill="#c8a84b"/><circle cx="8" cy="8" r="4" fill="#c8a84b"/><path d="M2,2 Q30,2 30,30 Q30,2 58,2" stroke="#c8a84b" stroke-width="1.5" fill="none"/><path d="M2,2 Q2,30 30,30 Q2,30 2,58" stroke="#c8a84b" stroke-width="1.5" fill="none"/><rect x="1" y="1" width="22" height="2" fill="#c8a84b"/><rect x="1" y="1" width="2" height="22" fill="#c8a84b"/></svg></div>
                <div class="corner bl"><svg viewBox="0 0 60 60"><path d="M2,2 L58,2 L58,10 L10,10 L10,58 L2,58 Z" fill="#1a2a6e" opacity="0.15"/><path d="M2,2 L20,2 L20,4 L4,4 L4,20 L2,20 Z" fill="#c8a84b"/><circle cx="8" cy="8" r="4" fill="#c8a84b"/><path d="M2,2 Q30,2 30,30 Q30,2 58,2" stroke="#c8a84b" stroke-width="1.5" fill="none"/><path d="M2,2 Q2,30 30,30 Q2,30 2,58" stroke="#c8a84b" stroke-width="1.5" fill="none"/><rect x="1" y="1" width="22" height="2" fill="#c8a84b"/><rect x="1" y="1" width="2" height="22" fill="#c8a84b"/></svg></div>
                <div class="corner br"><svg viewBox="0 0 60 60"><path d="M2,2 L58,2 L58,10 L10,10 L10,58 L2,58 Z" fill="#1a2a6e" opacity="0.15"/><path d="M2,2 L20,2 L20,4 L4,4 L4,20 L2,20 Z" fill="#c8a84b"/><circle cx="8" cy="8" r="4" fill="#c8a84b"/><path d="M2,2 Q30,2 30,30 Q30,2 58,2" stroke="#c8a84b" stroke-width="1.5" fill="none"/><path d="M2,2 Q2,30 30,30 Q2,30 2,58" stroke="#c8a84b" stroke-width="1.5" fill="none"/><rect x="1" y="1" width="22" height="2" fill="#c8a84b"/><rect x="1" y="1" width="2" height="22" fill="#c8a84b"/></svg></div>
                <div class="reg-bar"><span>Regd. No.: ${application.registrationNo || 'N/A'}</span></div>
                <div class="header-row">
                  <div class="logo-area"><div class="logo-circle">${logoHtml}</div><div class="logo-sub">Computer & Technical Institute</div></div>
                  <div class="center-header">
                    <div class="institute-title">RID<span style="font-size:14px;">™</span></div>
                    <div class="location-bar">Bhopal, Madhya Pradesh (M.P.), India</div>
                    <div class="iso-text">An ISO 9001 : 2015 Certified Institute</div>
                    <div class="cert-title-bar">CERTIFICATE OF COMPLETION</div>
                  </div>
                  <div style="width:100px; flex-shrink:0;"><svg class="iso-badge" viewBox="0 0 100 100"><defs><radialGradient id="goldGrad" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#f5d060"/><stop offset="60%" stop-color="#c8a030"/><stop offset="100%" stop-color="#8a6010"/></radialGradient></defs><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="url(#goldGrad)" stroke="#8a6010" stroke-width="1"/><circle cx="50" cy="50" r="28" fill="url(#goldGrad)" stroke="#8a6010" stroke-width="1.5"/><text x="50" y="38" text-anchor="middle" font-size="7" font-weight="bold" fill="#1a2a6e">CERTIFIED</text><text x="50" y="52" text-anchor="middle" font-size="12" font-weight="900" fill="#cc0000">ISO</text><text x="50" y="63" text-anchor="middle" font-size="8" font-weight="bold" fill="#1a2a6e">9001:2015</text><text x="50" y="73" text-anchor="middle" font-size="7" font-weight="bold" fill="#1a2a6e">CERTIFIED</text></svg></div>
                </div>
                <div class="cert-no">Cert. No. : <span>${application.certificateNo}</span></div>
                <hr class="divider">
                <div class="body-row">
                  <div class="main-content">
                    <div class="certify-text">This is to Certify that</div>
<div class="student-name">
${escapeHtml(application.studentName)}
</div>
                    <div class="name-underline"></div>
                    <div class="father-row"><span class="label">S/o</span><span class="val">${escapeHtml(application.fatherName)}</span></div>
                    <div class="completed-text">has successfully completed the</div>
                    <div class="course-title">${escapeHtml(application.courseName)}</div>
                    <div class="date-row"><span>from</span><span class="date-val">${formattedStart}</span><span>to</span><span class="date-val">${formattedEnd}</span></div>
                    <div class="marks-row"><span>and has secured</span><span class="val-box">${application.marks}</span><span>% Marks with</span><span class="val-box">${application.grade}</span><span>Grade.</span></div>
                    <div class="wish-text">We wish him/her all the best for future endeavors.</div>
                    <div class="signatures">
                      <div class="sig-block">
<div style="font-family:'Great Vibes',cursive;font-size:26px;">
Dr. Rajesh Kumar
</div>

                     <div class="sig-line"></div>

                      <div class="sig-name">Director</div>

                      <div class="sig-sub">RID Institute</div>
                      </div>
                      <div class="sig-block">
<div style="font-family:'Great Vibes',cursive;font-size:26px;">Signatory</div>
                        <div class="sig-line"></div>
                       <div class="sig-name">Authorised Signatory</div>
                      </div>
                    </div>
                  </div>
                  <div class="side-info">
                    <div class="photo-box">${photoHtml}</div>
                    <table class="info-table">
                      <tr><td class="label">Enroll No.</td><td class="val">: ${application.enrollNo || 'N/A'}</td></tr>
                      <tr><td class="label">Roll No.</td><td class="val">: ${application.rollNo || 'N/A'}</td></tr>
                      <tr><td class="label">Date of Issue</td><td class="val">: ${formattedIssue}</td></tr>
                    </table>
                    <div class="qr-area"><svg width="75" height="75" viewBox="0 0 75 75"><rect width="75" height="75" fill="white" stroke="#ccc" stroke-width="1"/><rect x="5" y="5" width="21" height="21" fill="none" stroke="#222" stroke-width="2.5"/><rect x="9" y="9" width="13" height="13" fill="#222"/><rect x="12" y="12" width="7" height="7" fill="white"/><rect x="49" y="5" width="21" height="21" fill="none" stroke="#222" stroke-width="2.5"/><rect x="53" y="9" width="13" height="13" fill="#222"/><rect x="56" y="12" width="7" height="7" fill="white"/><rect x="5" y="49" width="21" height="21" fill="none" stroke="#222" stroke-width="2.5"/><rect x="9" y="53" width="13" height="13" fill="#222"/><rect x="12" y="56" width="7" height="7" fill="white"/><rect x="30" y="5" width="4" height="4" fill="#222"/><rect x="36" y="5" width="4" height="4" fill="#222"/><rect x="42" y="5" width="4" height="4" fill="#222"/><rect x="30" y="11" width="4" height="4" fill="#222"/><rect x="36" y="11" width="4" height="4" fill="#222"/><rect x="30" y="17" width="8" height="4" fill="#222"/><rect x="42" y="17" width="4" height="4" fill="#222"/><rect x="5" y="30" width="4" height="4" fill="#222"/><rect x="11" y="30" width="4" height="4" fill="#222"/><rect x="17" y="30" width="4" height="4" fill="#222"/><rect x="5" y="36" width="8" height="4" fill="#222"/><rect x="17" y="36" width="4" height="4" fill="#222"/><rect x="5" y="42" width="4" height="4" fill="#222"/><rect x="11" y="42" width="8" height="4" fill="#222"/><rect x="30" y="30" width="4" height="4" fill="#222"/><rect x="38" y="30" width="8" height="4" fill="#222"/><rect x="30" y="38" width="8" height="4" fill="#222"/><rect x="42" y="38" width="4" height="4" fill="#222"/><rect x="48" y="30" width="4" height="4" fill="#222"/><rect x="56" y="30" width="4" height="4" fill="#222"/><rect x="64" y="30" width="4" height="4" fill="#222"/><rect x="48" y="36" width="8" height="4" fill="#222"/><rect x="64" y="36" width="4" height="4" fill="#222"/><rect x="48" y="42" width="4" height="4" fill="#222"/><rect x="56" y="42" width="8" height="4" fill="#222"/><rect x="30" y="48" width="4" height="4" fill="#222"/><rect x="36" y="48" width="4" height="4" fill="#222"/><rect x="44" y="48" width="4" height="4" fill="#222"/><rect x="30" y="56" width="8" height="4" fill="#222"/><rect x="42" y="54" width="4" height="4" fill="#222"/><rect x="30" y="64" width="4" height="4" fill="#222"/><rect x="38" y="62" width="4" height="4" fill="#222"/><rect x="44" y="66" width="6" height="4" fill="#222"/></svg><div class="qr-scan-text">Scan to Verify</div></div>
                  </div>
                </div>
                <div class="verify-footer">
                  <div class="website-url"><i class="fas fa-globe"></i> ${WEBSITE_URL}</div>
                  <div class="verify-text"><i class="fas fa-shield-alt"></i> Verify this certificate at ${WEBSITE_URL} using Certificate No.: ${application.certificateNo} or Registration No.: ${application.registrationNo}</div>
                </div>
              </div>
            </div>
            <div class="bottom-curve"></div>
          </div>
        </div>
        <div class="no-print" style="text-align:center; margin-top:20px;">
          <button onclick="window.print();" style="background:#1a2a6e; color:white; border:none; border-radius:40px; padding:12px 32px; margin:10px; cursor:pointer;"><i class="fas fa-print"></i> Print / Save as PDF</button>
          <button onclick="window.close();" style="background:#6c757d; color:white; border:none; border-radius:40px; padding:12px 32px; margin:10px; cursor:pointer;"><i class="fas fa-times"></i> Close</button>
        </div>
   
        <\/body><\/html>`);
        
    } catch (err) {
        console.error("Download error:", err);
        res.status(500).send(`
            <html>
            <head>
                <title>Error</title>
                <style>
                    body { font-family: Arial; text-align: center; padding: 50px; background: #1a1a2e; }
                    .error { color: red; background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: auto; }
                    button { background: #1a2a6e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="error">
                    <h1>❌ Error</h1>
                    <p>Something went wrong: ${err.message}</p>
                    <button onclick="window.history.back()">Go Back</button>
                </div>
            </body>
            </html>
        `);
    }
};

// Helper function for escapeHtml
function escapeHtml(str) {
    if(!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    });
}


module.exports = {
  createApplication,
  verifyApplicationViaEmail,
  getApplicationByCertificateNo,
  getPendingApplications,
  getVerifiedApplications,
  downloadCertificate,
};