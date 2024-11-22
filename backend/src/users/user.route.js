const express = require('express');
const {
    registerUser,
    loginAdmin,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    createUser,
} = require('./user.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/admin", loginAdmin);

// Admin-protected routes
router.get("/", getAllUsers);
router.get("/:id", verifyAdminToken, getSingleUser);
// router.post('/create-user',verifyAdminToken, createUser);
router.put("/update/:id", verifyAdminToken, updateUser);
router.delete("/:id", verifyAdminToken, deleteUser);

module.exports = router;
