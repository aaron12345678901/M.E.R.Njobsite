// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// const Job = require("../models/job");
// // Correct the import to match the variable name 'auth'
// const authMiddleware = require('../middleware/authMiddleware'); 

// router.post("/register", authController.register);
// router.post("/login", authController.login);

// // Use the correct variable name 'authMiddleware'
// router.get('/profile', authMiddleware, authController.getProfile);   // Route to get the profile
// router.put('/profile', authMiddleware, authController.updateProfile); // Route to update the profile

// module.exports = router;


const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware'); 

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get('/profile', authMiddleware, authController.getProfile);   
router.put('/profile', authMiddleware, authController.updateProfile); 

module.exports = router;