/* eslint-disable no-unused-vars */

import React, { useState, useRef, useEffect } from 'react';
import 'chartjs-adapter-moment';  // Add this import statement
import moment from 'moment';  
import { makeStyles, CircularProgress } from "@material-ui/core";
import {  Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { usePublisher } from '../PublisherContext';


const useStyles = makeStyles((theme) => ({
  container: {
    width: "85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));



const PublisherInfo = () => {
  const { selectedPublisher } = usePublisher();
  //console.log('selectedPublisher from INFO', selectedPublisher)
  const data = selectedPublisher?.data?.report;
  const classes = useStyles();
  const [chartInstance, setChartInstance] = useState(null);


//   const getChartDataForRechartsOnAverageViewRate = () => {
//     const rechartsData = data.map(entry => ({
//       date: entry.date,
//       ...entry.adslots.reduce((acc, slot) => {
//         acc[slot.slot] = slot.average_view_rate;
//         return acc;
//       }, {}),
//     }));

//     return rechartsData;
//   };

  const getChartDataForRechartsOnCustomAverageViewRate = () => {
    const rechartsData = data.map(entry => ({
      date: entry.date,
      ...entry.adslots.reduce((acc, slot) => {
        acc[slot.slot] = slot.average_custom_view_rate;
        return acc;
      }, {}),
    }));

    return rechartsData;
  };

  //console.log('getChartDataForRecharts', getChartDataForRechartsOnAverageViewRate());
  //console.log('getChartDataForRechartsCustomViewRate', getChartDataForRechartsOnCustomAverageViewRate());



  const averageCustomViewRateData = getChartDataForRechartsOnCustomAverageViewRate();

  const chartData = {
    labels: averageCustomViewRateData.map(item => item.date),
    datasets: ['sky', 'mrec', 'superbanner', 'banner'].map((type, index) => ({
      label: type,
      data: averageCustomViewRateData.map(item => item[type]),
      borderColor: `hsl(${index * 90}, 70%, 50%)`,
      fill: false,
    })),
  };


  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          parser: 'YYYY-MM-DD',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Custom View Rate',
        },
      },
    },
  };
  

  // useEffect(() => {
  //   // Destroy the previous chart instance before rendering a new one
  //   if (chartInstance) {
  //     chartInstance.destroy();
  //   }

  //   // Render the new chart instance
  //   const newChartInstance = new Chart(document.getElementById('chart'), {
  //     type: 'line',
  //     data: chartData,
  //     options: chartOptions,
  //   });

  //   // Save the new chart instance to state
  //   setChartInstance(newChartInstance);

  //   // Cleanup on component unmount
  //   return () => {
  //     if (newChartInstance) {
  //       newChartInstance.destroy();
  //     }
  //   };
  // }, []);


  useEffect(() => {
    // Check if selectedPublisher is available before rendering the chart
    if (selectedPublisher) {
      // Destroy the previous chart instance before rendering a new one
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Render the new chart instance
      const newChartInstance = new Chart(document.getElementById('chart'), {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });

      // Save the new chart instance to state
      setChartInstance(newChartInstance);

      // Cleanup on component unmount
      return () => {
        if (newChartInstance) {
          newChartInstance.destroy();
        }
      };
    }
  }, [selectedPublisher]);

  return (
    <div className={classes.container}>
      {!selectedPublisher ? (
        <CircularProgress
          style={{ color: "gold" }}
          size={250}
          thickness={1}
        />
      ) : (
        
         
        <canvas id="chart" />
        
      )}
    </div>
  );
}

export default PublisherInfo


