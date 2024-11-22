import React, { useState } from 'react';
import { Paper, Typography, Button, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
    const [showBanner, setShowBanner] = useState(true);
    const navigate = useNavigate();

    if (!showBanner) return null;

    return (
        <Paper
            elevation={2}
            className="flex flex-col md:flex-row items-center justify-between p-6 mb-6 relative"
            sx={{
                backgroundColor: 'blue.400 !important', // Force this color
                borderRadius: '8px',
                color: 'black', // Ensure text color contrasts with background
                cursor: 'pointer',
                '&:hover': { boxShadow: 4, backgroundColor: 'blue.500' }, // Slightly darken on hover
            }}
            onClick={() => navigate('/apply-courier')}
        >
            {/* Close Icon */}
            <Tooltip title="Close" placement="top">
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when closing
                        setShowBanner(false);
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Tooltip>

            {/* Content */}
            <div>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Become a Courier Today!
                </Typography>
                <Typography variant="body1" mt={1}>
                    Join our team and start delivering in your community. It’s fast, flexible, and rewarding! 
                    We are currently looking for courier!
                </Typography>
            </div>

            {/* Apply Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking the button
                    navigate('/apply-courier');
                }}
                className="mt-10 md:mt-2"
                sx={{ fontWeight: 'bold', padding: '8px 16px' }}
            >
                Apply Now
            </Button>
        </Paper>
    );
};

export default Apply;
