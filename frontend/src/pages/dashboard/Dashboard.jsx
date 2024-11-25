import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';
import Loading from '../../components/Loading';
import OrdersChart from '../dashboard/Charts/OrdersChart';
import SalesChart from '../dashboard/Charts/SalesChart';

import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import { GoBook } from "react-icons/go";
import { IoMdTrendingUp } from "react-icons/io";
import { RiFireLine, RiShoppingCartLine } from "react-icons/ri";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [ordersDateRange, setOrdersDateRange] = useState({ start: '', end: '' });
    const [salesDateRange, setSalesDateRange] = useState({ start: '', end: '' });
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });

                setData(response.data); // Keep the full data from API
                setFilteredOrders(response.data?.monthlyOrders || []); // Default to full data
                setFilteredSales(response.data?.monthlySales || []); // Default to full data
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []); // Only run once when the component mounts

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
        setAlertMessage('');
    };

    const handleFilterOrders = () => {
        if (!ordersDateRange.start || !ordersDateRange.end) {
            showAlert('Please select both start and end dates for orders.');
            return;
        }

        const startDate = new Date(ordersDateRange.start);
        const endDate = new Date(ordersDateRange.end);

        // Filter orders based on the selected date range
        const filtered = data?.monthlyOrders?.filter(order => {
            const orderDate = new Date(order.year, order.month - 1); // Month is 0-indexed
            return (orderDate >= startDate && orderDate <= endDate);
        });

        const monthsInRange = [];
        for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
            for (let month = 1; month <= 12; month++) {
                const foundOrder = filtered.find(order => order.year === year && order.month === month);
                if ((new Date(year, month - 1) >= startDate) && (new Date(year, month - 1) <= endDate)) {
                    monthsInRange.push(foundOrder || { year, month, totalOrders: 0 });
                }
            }
        }

        setFilteredOrders(monthsInRange);
    };

    const handleFilterSales = () => {
        if (!salesDateRange.start || !salesDateRange.end) {
            showAlert('Please select both start and end dates for sales.');
            return;
        }

        const startDate = new Date(salesDateRange.start);
        const endDate = new Date(salesDateRange.end);

        // Filter sales based on the selected date range
        const filtered = data?.monthlySales?.filter(sale => {
            const saleDate = new Date(sale.year, sale.month - 1); // Month is 0-indexed
            return (saleDate >= startDate && saleDate <= endDate);
        });

        const monthsInRange = [];
        for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
            for (let month = 1; month <= 12; month++) {
                const foundSale = filtered.find(sale => sale.year === year && sale.month === month);
                if ((new Date(year, month - 1) >= startDate) && (new Date(year, month - 1) <= endDate)) {
                    monthsInRange.push(foundSale || { year, month, totalSales: 0 });
                }
            }
        }

        setFilteredSales(monthsInRange);
    };

    return (
        <Container maxWidth="xl" style={{ padding: 0 }}>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleAlertClose} severity="warning" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>

            {/* Overview Cards */}
            <Grid container spacing={2}>
                {/* Cards */}
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={2} style={{ marginTop: 16 }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} style={{ padding: 16 }}>
                        <Typography variant="h6" style={{ marginBottom: 16 }}>
                            Monthly Orders Chart
                        </Typography>
                        <Box display="flex" alignItems="center" marginBottom={2}>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={ordersDateRange.start}
                                onChange={(e) => setOrdersDateRange({ ...ordersDateRange, start: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                fullWidth
                                style={{ marginRight: 8 }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                value={ordersDateRange.end}
                                onChange={(e) => setOrdersDateRange({ ...ordersDateRange, end: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFilterOrders}
                                style={{ marginLeft: 8, height: 40 }}
                            >
                                Filter
                            </Button>
                        </Box>
                        <OrdersChart monthlyOrders={filteredOrders} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} style={{ padding: 16 }}>
                        <Typography variant="h6" style={{ marginBottom: 16 }}>
                            Monthly Sales Chart
                        </Typography>
                        <Box display="flex" alignItems="center" marginBottom={2}>
                            <TextField
                                label="Start Date"
                                type="date"
                                value={salesDateRange.start}
                                onChange={(e) => setSalesDateRange({ ...salesDateRange, start: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                fullWidth
                                style={{ marginRight: 8 }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                value={salesDateRange.end}
                                onChange={(e) => setSalesDateRange({ ...salesDateRange, end: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFilterSales}
                                style={{ marginLeft: 8, height: 40 }}
                            >
                                Filter
                            </Button>
                        </Box>
                        <SalesChart monthlySales={filteredSales} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
