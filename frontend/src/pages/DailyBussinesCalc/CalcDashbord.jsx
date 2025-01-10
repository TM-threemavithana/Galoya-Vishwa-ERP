import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DailyBusinessCalculator = () => {
  const { state } = useLocation();
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/distributions');
        console.log('Distributions API response:', response.data);
        setDistributions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching distributions data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributions();
  }, []);

  const pieData = {
    labels: Array.isArray(distributions) ? distributions.map((d) => d.category) : [],
    datasets: [
      {
        label: '# of Votes',
        data: Array.isArray(distributions) ? distributions.map((d) => d.value) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Daily Business Calculator</h1>
      {loading ? (
        <p>Loading...</p>
      ) : distributions.length > 0 ? (
        <div>
          <h2>Distributions Pie Chart</h2>
          <Pie data={pieData} />
        </div>
      ) : (
        <p>No distribution data available.</p>
      )}
    </div>
  );
};

export default DailyBusinessCalculator;
