import axios from 'axios';

const API_URL = 'http://localhost:8080/api/dashboard';  // Adjust the URL to match your backend

export const getDashboardData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data', error);
        return null;
    }
};
