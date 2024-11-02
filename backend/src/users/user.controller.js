const User = require('../users/user.model');  // Adjust the path based on your directory structure

// Submit Courier Application
exports.submitCourierApplication = async (req, res) => {
    try {
        const { userId } = req.params;  // Assuming the user ID is sent as a URL parameter
        const { vehicleInfo, serviceArea, validId } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'customer') {
            return res.status(400).json({ message: 'Only customers can apply to be a courier' });
        }
        
        if (user.courierApplicationStatus === 'pending') {
            return res.status(400).json({ message: 'Application already submitted and is under review' });
        }

        // Update user fields for courier application
        user.courierApplicationStatus = 'pending';
        user.applicationDate = new Date();
        user.vehicleInfo = vehicleInfo;
        user.serviceArea = serviceArea;
        user.validId = validId;

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'Courier application submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while submitting the application' });
    }
};

// Approve or Reject Courier Application
exports.processCourierApplication = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;  // 'approved' or 'rejected'

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.courierApplicationStatus !== 'pending') {
            return res.status(400).json({ message: 'No pending application found for this user' });
        }

        // Approve the application
        if (status === 'approved') {
            user.courierApplicationStatus = 'approved';
            user.approvalDate = new Date();
            user.role = 'courier';  // Update the role to courier
            user.isAvailable = true;  // Set initial availability status
        } 
        // Reject the application
        else if (status === 'rejected') {
            user.courierApplicationStatus = 'rejected';
            user.applicationDate = null;
            user.approvalDate = null;
            user.vehicleInfo = null;
            user.serviceArea = { country: null, city: null };
            user.validId = null;
        } else {
            return res.status(400).json({ message: 'Invalid status. Must be either "approved" or "rejected".' });
        }

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: `Courier application ${status} successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing the application' });
    }
};
