const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure email is unique
        lowercase: true,  // Convert email to lowercase to avoid case sensitivity issues
        trim: true,  // Remove extra spaces
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'courier'],
        default: 'customer',  // Default role is 'customer'
    },
    avatar: {
        type: String,  // URL or path to the avatar image
        default: null,
    },
    address: {
        city: {
            type: String,
            default: null,
        },
        country: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        zipcode: {
            type: String,
            default: null,
        },
    },
    phone: {
        type: String,
        default: null,
    },
}, { timestamps: true });

// Pre-save middleware to hash passwords before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);  // Generate salt
        this.password = await bcrypt.hash(this.password, salt);  // Hash password
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Define the User model using the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
