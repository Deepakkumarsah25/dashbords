const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require('mongoose');
const passport = require("passport");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const nodemailer = require("nodemailer");
const dashboardRoutes = require("./routes/dashboard-count-all-system.js");
const candidateRoutes = require("./routes/candidateRoutes.js");
const configureMiddleware = require("./config/middleware");
dotenv.config();
// Initialize express app
const app = express();
const port = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const mongoUrl = process.env.MONGO_URI;
console.log('🔗 Attempting MongoDB Atlas connection...');
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(async () => {
    console.log('✅ MongoDB Atlas Connected Successfully');
   
    
    // Check if 'applications' collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const appCollectionExists = collections.some(c => c.name === 'applications');
    
    if (!appCollectionExists) {
        console.log('📝 Creating applications collection...');
        // Create collection if it doesn't exist
        await mongoose.connection.db.createCollection('applications');
        console.log('✅ Created applications collection');
    }
    
    // Create indexes for better performance
    const Application = require('./models/Application');
    await Application.createIndexes();
    
})
.catch(err => {
    console.error(' MongoDB Atlas Connection Error:', err.message);
    console.error(' Troubleshooting Steps:');
    console.error('   1. Check your MongoDB Atlas cluster is running');
    console.error('   2. Verify IP is whitelisted in Network Access');
    console.error('   3. Check username/password in connection string');
    console.error('   4. Check database name in connection string');
    process.exit(1);
});
// ========== SESSION CONFIGURATION ==========
app.use(session({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString("hex"),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        ttl: 24 * 60 * 60
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
}));

// ================= NO CACHE =================

app.use((req, res, next) => {

    res.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, private"
    );

    res.set("Pragma", "no-cache");

    res.set("Expires", "0");

    next();

});
// ========== SECURITY MIDDLEWARE ==========

app.use('/ebook/uploads', express.static(path.join(__dirname, 'public/uploads')));
// ========== CREATE UPLOAD DIRECTORIES ==========
const ensureUploadDirs = () => {
   const directories = [
    'public/uploads/pdfs',
    'public/uploads/covers',
    'uploads/research'
];
     directories.forEach(dir => {
        const fullPath = path.join(__dirname, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`✅ Created directory: ${fullPath}`);
        } else {
            console.log(`📁 Directory exists: ${fullPath}`);
        }
    });
};
ensureUploadDirs();
// ========== VIEW ENGINE SETUP ==========
const configureViews = () => {
  app.set("view engine", "ejs");

  // ✅ ALL VIEWS (main + code folder)
  app.set("views", [
    path.join(__dirname, "views", "ebook"),
    path.join(__dirname, "views"),
    path.join(__dirname, "code", "views"),   // 🔥 ADD THIS
    path.join(__dirname,"DCA","views")

  ]);

  // ✅ STATIC FILES (CSS, JS, images)
  app.use(express.static(path.join(__dirname, "public")));        // main public
  app.use(express.static(path.join(__dirname, "code", "public"))); // 🔥 code/public
  app.use(express.static(path.join(__dirname,"DCA","public")))
};

//=========================RTS MIDDLEWIRE=====================
const rtsApp = require("./RTS/rtsmiddlewire");
app.use("/rts", rtsApp);
// ========== GLOBAL VARIABLES MIDDLEWARE ==========
const User = require("./models/user");
const Teacher = require("./models/Teacher");
const Organisation = require("./models/Organisation");
const Question = require("./models/Question"); // ✅ ADD THIS
const TeacherTest = require("./models/teacherTestModel");
app.use(async (req, res, next) => {
    res.locals.user = null;

    if (req.session && req.session.userId) {
        try {
            let user = null;

            if (req.session.userRole === "student") {
                user = await User.findById(req.session.userId);
            }
            else if (req.session.userRole === "teacher") {
                user = await Teacher.findById(req.session.userId);
            }
            else if (req.session.userRole === "organisation") {
                user = await Organisation.findById(req.session.userId);
            }

            if (user) {
                res.locals.user = user;
            }

        } catch (err) {
            console.log("User fetch error:", err);
        }
    }

    next();
});
// ========== INITIALIZE SECURITY STORAGE ==========
app.locals.securityEvents = new Map();
app.locals.pdfTokens = new Map();
// ========== EBOOK ROUTES ==========
app.use('/ebook', require('./routes/pdfRoutes'));
app.use('/ebook', require('./routes/authebookRoutes'));
// ========== WORKSHOP ROUTES (MOVE HERE) ==========
const workshopRoutes = require('./routes/workshopRoutes');
app.use('/api/workshop', workshopRoutes);
// ========== MAIN APPLICATION ROUTES ==========
const configureRoutes = () => {
  // API Routes
  const organisationRoutes = require("./routes/organisation");
  const userRoutes = require("./routes/userRoutes");
  const authRoutes = require("./routes/authRoutes");
  const adminRoutes = require("./routes/admin");
  const verifyRoutes = require("./routes/verify");
  const authenticateJWT = require("./middleware/authMiddleware");
  // ========== CERTIFICATE ROUTES ==========
  const applicationRoutes = require("./routes/applicationRoutes");
  app.use("/api", applicationRoutes);
  app.use("/user", userRoutes);
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/verify", verifyRoutes);
  app.use("/api/organisation", organisationRoutes);
  app.use("/api/user", userRoutes);
  // ========== SECURE PDF ACCESS ==========
  app.use('/ebook/uploads/pdfs', (req, res, next) => {
      const referer = req.get('Referer');
      if (!referer || (!referer.includes('/ebook/secure-viewer/') && !referer.includes('/ebook/download/'))) {
          return res.status(403).json({ 
              error: 'Access denied',
              message: 'Direct file access is not allowed. Please use the secure viewer.'
          });
      }
      next();
  });
// Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" }
});
// socket logic
let onlineTestUsers = 0;
io.on("connection", (socket) => {
  onlineTestUsers++;
  io.emit("onlineUsers", onlineTestUsers);

  socket.on("disconnect", () => {
    onlineTestUsers--;
    io.emit("onlineUsers", onlineTestUsers);
  });
});
// 🔥 IMPORTANT PART
app.listen = function () {
  return server.listen.apply(server, arguments);
};
  // ========== RTS INTEGRATION ==========
  app.use("/RTS/public", express.static(path.join(__dirname, "RTS", "public")));
  app.use("/rts", express.static(path.join(__dirname, "RTS", "public")));
  
  app.get("/rts/main", (req, res) => {
    res.sendFile(path.join(__dirname, "RTS", "public", "main.html"));
  });
// ========== VIEW ROUTES ==========
  const Organisation = require("./models/Organisation");
  const Book = require("./models/Book");

  app.get("/books", async (req, res) => {
    try {
      const books = await Book.find({});
      res.render("books", { moreBooks: books });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching books");
    }
  });

  app.get("/flipbook", (req, res) => {
    res.render("flipbook", {
      title: "RID Button Flipbook",
      pdfUrl: "/pdf/pdf.pdf",
      downloadUrl: "/images/pdf.rar",
    });
  });

  app.get("/organization-dashboard", authenticateJWT, async (req, res) => {
    try {
      const organization = await Organisation.findOne();
      if (!organization) return res.status(404).send("Organization not found");
      res.render("organizationDashboard", { organization });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });

  app.get("/organization-dashboard/:id", authenticateJWT, async (req, res) => {
    try {
      const organisationId = req.params.id;
      const organisation = await Organisation.findById(organisationId);
      if (!organisation)
        return res.status(404).json({ error: "Organization not found" });
      res.render("organization-dashboard", { organisation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // ========== STATIC HTML ROUTES ==========
  const roleMiddleware = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) return next();
    res.redirect("/login");
  };

  app.get("/organisation", authenticateJWT, roleMiddleware("organisation"), (req, res) => {
    res.render("register-org");
  });

  app.get("/teacher", authenticateJWT, roleMiddleware("teacher"), (req, res) => {
    res.sendFile(path.join(__dirname, "public", "teacher.html"));
  });

  app.get("/student", authenticateJWT, roleMiddleware("student"), (req, res) => {
    res.sendFile(path.join(__dirname, "public", "student.html"));
  });

  app.get("/reset-password", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Reset-Password/reset-password.html"));
  });

  app.get("/forgot-password", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Forgot-Password/forgot-password.html"));
  });

  app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Signup/form.html"));
  });

  app.get("/onlineTest", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "component/onlineTest.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Login/login.html"));
  });

  app.get("/verify", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Certificate-Verification/verify.html"));
  });

  // ========== WORKSHOP FORM PAGE ==========
  app.get("/workshop-form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "workshop/form.html"));
  });

  app.get("/", (req, res) => {
    res.render("index.ejs")
  });

  app.get("/searchResult", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "searchResult.html"));
  });

  app.get("/serverpdf", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "serverpdf.html"));
  });

  // ========== CERTIFICATE STATIC ROUTES ==========
  app.get("/certificate", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Certificate-Verification/certificate.html"));
  });

  app.get("/apply-certificate", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "Certificate-Verification/Applay-certificate.html"));
  });

  app.get("/ebook", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "ebook.html"));
  });

  app.get("/get-pdf", (req, res) => {
    const pdfPath = path.join(__dirname, "ebookdata", "azenglish.pdf");
    const pdfStream = fs.createReadStream(pdfPath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    pdfStream.pipe(res);
  });
// ========== LOGOUT ROUTE ==========
 // ================= LOGOUT =================

app.get("/logout", (req, res) => {

    res.clearCookie("token");

    req.session.destroy((err) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false
            });

        }

        res.clearCookie("connect.sid");

        return res.json({
            success: true
        });

    });

});
// ========== DURATION API ==========
  app.get("/api/duration", (req, res) => {
    const duration = process.env.DURATION;
    if (!duration)
      return res.status(500).json({ error: "Duration not set in .env file" });
    res.json({ duration });
  });

  // ========== CATCH-ALL 404 ==========
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404/404.html"));
  });
};

configureMiddleware(app);
configureViews();
// ======= RTS AUTH ROUTES (MUST BE BEFORE 404) =======
const teacherRoutes = require("./routes/teacherRoutes");
app.use("/", teacherRoutes);
const studentRoutes = require("./routes/studentRoutes");
app.use("/", studentRoutes);
// 🔽 यहीं add करो
const giftRoutes = require("./routes/giftRoutes");
app.use("/", giftRoutes);
// student ranks system ==============
const authenticateJWT = require("./middleware/authMiddleware");
const teacherAnalyticsRoutes = require("./routes/teacherAnalytics");
// 🔥 AUTH REQUIRED FOR ANALYTICS
app.use(
  "/api/teacher/analytics",
  authenticateJWT,
  teacherAnalyticsRoutes
);
// pdf downloads 
const teacherAnalyticsRoutess = require("./routes/teacherAnalyticsRoutes");
app.use(teacherAnalyticsRoutess);
app.get("/ebook", (req, res) => {
  res.render("ebook/dashboard");
});
// advance version routes
const teacherTestApi = require("./routes/teacherTestApi");
app.use("/api/teacher-tests", teacherTestApi);
app.post("/api/send-email", async (req, res) => {
    const { studentEmail, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: studentEmail,
            subject: subject,
            text: message
        });

        res.json({ success: true });
    } catch (err) {
        console.error("Email error:", err);
        res.json({ success: false });
    }
});
app.get("/com",(req,res)=>{
  res.render("product/pdftools/compresspdf.ejs")
  })
const teacherTests = require("./routes/teacherTests");
app.use("/teacher-tests", teacherTests);
const advanceStudentRoutes = require("./routes/advanceStudentRoutes");
app.use("/advance-student", advanceStudentRoutes);
const aiRoutes = require("./routes/aiRoutes");
app.use("/ai", aiRoutes);
const AddvanceAnalyticsRoutes = require("./routes/Add-versionAnalyticsRoutes.js");
app.use("/api/teacher/analytics", AddvanceAnalyticsRoutes);
app.use("/dashboard", dashboardRoutes);
app.get("/research-papper",(req,res)=>{
  res.render("tracher_deshboard/advance-version/Research-papper/index.ejs")
})
// app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));
const researchRoutes = require("./routes/researchRoutes");
app.use("/api/research", researchRoutes);
//===role by login pages origanition pages ===========================
app.get("/library-dashboard",(req,res)=>{
  res.render("organisation/library-dashboard.ejs")

})

//DCA Class Routes this parts 
const computerClassRouters = require("./DCA/server.js");
app.use("/computer", computerClassRouters);
//============================================================
app.get("/dca-dashboard",(req,res)=>{
  res.render("organisation/dca-dashboard.ejs")
  
})
app.get("/coaching-dashboard",(req,res)=>{
  res.render("organisation/coaching-dashboard.ejs")
  
})

// Research Papers
app.get("/research-paper", (req, res) => {
  res.render("Research-Papers/Home");
});
//typing software
app.get("/typing-software",(req,res)=>{
  res.render("typing-software/main.ejs")
})
app.use("/service", require("./routes/service/servicerouter"));
//////////////////////////////////////////////////product routes/////////////////////////////////////////
const  productRoutes = require("./routes/product.js");
app.use("/",productRoutes);
// before configureRoutes()
app.use("/api/candidates", candidateRoutes);

// Research Paper Routes
const researchPaperRoutes = require("./routes/research/research-paper");
app.use("/", researchPaperRoutes);

// ye previous year paper ke liye h

const previousRoutes = require("./routes/previousyear");
app.use("/", previousRoutes);

app.use("/uploads", express.static("uploads"));

// ======= MAIN ROUTES (Admin Routes) =======
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const requireAdmin = require("./middleware/requireAdmin");
app.use("/admin", adminAuthRoutes);
app.get("/admin/dashboard", requireAdmin, (req, res) => {
  res.render("Admin/admin", {
    admin: req.admin
  });
});
app.get("/offerlatter",(req,res)=>{
  res.render("Admin/offerlatter/offerlatter-form.ejs")
})

app.use(express.static("public"));

const offerRoutes = require("./routes/offerRoutes");
app.use("/admin/offer", offerRoutes);
const adminUserRoutes = require("./routes/adminUserRoutes");

app.use("/api/admin", adminUserRoutes);

const service=require("./routes/service/servicerouter.js")
app.use("/",service)

const intership=require("./routes/intanships/intanshippage.js")
app.use("/",intership)
// service pages auto diteated logic routes
const Lead = require("./models/Lead.js");
//test serice admin routes 
const testServiceRoutes = require("./routes/admintestroutes/testserviceRoutes");
app.use("/api/tests", testServiceRoutes);  // IMPORTANT

//==========================National-Test-Series===============
const NationalTestSeries=require("./routes/nationalTestSeries/nationalTest")
app.use("/National-Test-Series",NationalTestSeries)
app.post("/api/save-lead", async (req,res)=>{

 try{

 const lead = new Lead(req.body)

 await lead.save()

 res.json({
   success:true
 })

 }catch(err){

 console.log(err)

 res.status(500).json({
   success:false
 })

 }

})

// natinal test create test routes
app.use(async (req, res, next) => {
  res.locals.user = null;

  if (req.session.userId) {
    let user = await User.findById(req.session.userId);
    if (!user) {
      user = await Teacher.findById(req.session.userId);
    }
    res.locals.user = user;
  }

  next();
});

app.get("/test-details", (req, res) => {
  res.render("NationalTestSeries/test-details");
});
app.use("/api", require("./routes/nationalTestSeries/follow"));
app.get("/cre",(req,res)=>{
  res.render("NationalTestSeries/CreateTest/CreateTest.ejs")
 })
const testRoutes = require("./routes/nationalTestSeries/teacherStudentTest");
app.use("/National-Test-Series", testRoutes);
// all india test routes 
const shortsRoutes = require("./routes/nationalTestSeries/shortroutes");
app.use("/", shortsRoutes);
const myteam=require("./routes/myteampages/myteam.js")
app.use("/",myteam)
// ===== TECH INTERVIEW SERVER CONNECT =====
const techInterviewApp = require("./code/server");
// middleware mount
app.use("/tech-interview", techInterviewApp);
configureRoutes();
// ========== START SERVER ==========
// ================== DB + SERVER START ==================
async function startServer() {
  try {
    console.log("🔗 Starting Server...");

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}


startServer();
//  SOCKET.IO AFTER SERVER
const { Server } = require("socket.io");
const io = new Server(server);

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("onlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("onlineUsers", onlineUsers);
  });
});

