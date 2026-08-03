const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    try{
        const newContact = new Contact({ name, email, phone, subject, message });
        await newContact.save();
        res.status(201).json({ 
            message: "Message sent successfully" 
        });
    }catch (err) {
        res.status(500).json({
            success: false, 
            error: err.message
        });
    }
});
module.exports = router;