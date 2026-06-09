const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createApplication,
  verifyApplicationViaEmail,
  getApplicationByCertificateNo,
  getPendingApplications,
  getVerifiedApplications,
  downloadCertificate,
} = require("../controllers/applicationController");

router.post(
  "/create",
  upload.single("photo"),
  createApplication
);

router.get("/verify/:id", verifyApplicationViaEmail);

router.get("/certificate/:certificateNo", getApplicationByCertificateNo);

router.get("/download-certificate/:certificateNo", downloadCertificate);

router.get("/applications/pending", getPendingApplications);

router.get("/applications/verified", getVerifiedApplications);

module.exports = router;