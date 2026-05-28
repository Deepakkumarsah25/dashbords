const express=require("express")
const router=express.Router()

router.get("/myteam",(req,res)=>{
    res.render("myteampages/myteam.ejs")
})

router.get("/about",(req,res)=>{
    res.render("footerparts/about.ejs")
})

router.get("/privacy-policy",(req,res)=>{
    res.render("footerparts/PrivacyPolicy.ejs")
})

router.get("/Terms&Conditions",(req,res)=>{
    res.render("footerparts/Terms&Conditions.ejs")
})

module.exports = router;