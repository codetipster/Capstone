import React from "react";
import { useEffect, useState, useContext } from "react";
import Banner from "../components/Banner/Banner";
import PublishersTable from "../components/PublishersTable";
import DataContext from '../contexts/DataContext';



function calculateAverageRates(data) {
  let totalViewRate = 0;
  let totalCustomViewRate = 0;
  let daysCounted = 0;

  for (const day of data.report) {
    let dailyTotalViewRate = 0;
    let dailyTotalCustomViewRate = 0;

    for (const adslot of day.adslots) {
      dailyTotalViewRate += adslot.average_view_rate;
      dailyTotalCustomViewRate += adslot.average_custom_view_rate;
    }

    const dailyAverageViewRate = dailyTotalViewRate / day.adslots.length;
    const dailyAverageCustomViewRate = dailyTotalCustomViewRate / day.adslots.length;

    totalViewRate += dailyAverageViewRate;
    totalCustomViewRate += dailyAverageCustomViewRate;

    daysCounted++;

    if (daysCounted === 7) break;
  }

  const averageViewRate = totalViewRate / daysCounted;
  const averageCustomViewRate = totalCustomViewRate / daysCounted;

  return { averageViewRate, averageCustomViewRate };
}




function calculateDailyAverage(adslots) {
  let totalViewRate = 0;
  let totalCustomViewRate = 0;
  adslots.forEach(adslot => {
    totalViewRate += adslot.average_view_rate;
    totalCustomViewRate += adslot.average_custom_view_rate;
  });
  return {
    averageViewRate: totalViewRate / adslots.length,
    averageCustomViewRate: totalCustomViewRate / adslots.length
  };
}



function calculateAverageDifferenceOfTwoDays(data) {
  //console.log('calculateAverageDifference', data);
  if (data.report.length < 2) {
    return { differenceViewRate: null, differenceCustomViewRate: null };
  }


  // const calculateDailyAverage = (adslots) => {
  //   let totalViewRate = 0;
  //   let totalCustomViewRate = 0;
  //   adslots.forEach(adslot => {
  //     totalViewRate += adslot.average_view_rate;
  //     totalCustomViewRate += adslot.average_custom_view_rate;
  //   });
  //   return {
  //     averageViewRate: totalViewRate / adslots.length,
  //     averageCustomViewRate: totalCustomViewRate / adslots.length
  //   };
  // };

  // Assuming the last element is the most recent day (today)
  const todayData = calculateDailyAverage(data.report[data.report.length - 1].adslots);
  // And the one before is yesterday
  const yesterdayData = calculateDailyAverage(data.report[data.report.length - 2].adslots);

  // Calculate the difference
  return {
    differenceViewRate: todayData.averageViewRate - yesterdayData.averageViewRate,
    differenceCustomViewRate: todayData.averageCustomViewRate - yesterdayData.averageCustomViewRate
  };
}


function calculateTodayAverages(data) {
  if (data.report.length === 0) {
    // No data available for today
    return { todayAverageViewRate: null, todayAverageCustomViewRate: null };
  }

  const todayData = data.report[data.report.length - 1]; // The most recent day's data
  const todayAverages = calculateDailyAverage(todayData.adslots); // Reuse calculateDailyAverage

  return {
    todayAverageViewRate: todayAverages.averageViewRate,
    todayAverageCustomViewRate: todayAverages.averageCustomViewRate
  };
}


const Homepage = () => {
  const { publishers } = useContext(DataContext);
  const [publisherData, setPublisherData] = useState({});
  const [averageRates, setAverageRates] = useState({});
  const [differences, setDifferences] = useState({});
  const [todayAverages, setTodayAverages] = useState({});
  
  
  
  useEffect(() => {
    const fetchDataForPublishers = async () => {
      const token = localStorage.getItem('authToken');
      let dataForAllPublishers = {};
      
      try {
        for (const publisher of publishers.available_publishers) {
          const publisherId = Number(publisher.id);
          const response = await fetch(`https://reports.asadcdn.com:5200/getViewabilityReport?publisher_id=${publisherId}&date_range=last7days`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          dataForAllPublishers[publisher.id] = data;
        }
  
        setPublisherData(dataForAllPublishers);
  
        //Calculate average rates and differences
        let calculatedAverageRates = {};
        let calculatedDifferences = {};
        let todayAverages = {};
        for (const [publisherId, publisherInfo] of Object.entries(dataForAllPublishers)) {
          calculatedAverageRates[publisherId] = calculateAverageRates(publisherInfo);
          calculatedDifferences[publisherId] = calculateAverageDifferenceOfTwoDays(publisherInfo);
          todayAverages[publisherId] = calculateTodayAverages(publisherInfo);
        }
  
        setAverageRates(calculatedAverageRates);
        setDifferences(calculatedDifferences);
        setTodayAverages(todayAverages);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataForPublishers();
  }, [publishers]);

  
  
  
  

  //console.log('publisherData homepage', publisherData);
  
  // Create a combined data array
  const combinedData = publishers.available_publishers.map(publisher => {
    return {
      ...publisher, 
      data: publisherData[publisher.id], 
      averages: averageRates[publisher.id], 
      difference: differences[publisher.id],
      todayAverages: todayAverages[publisher.id]
    };
  });

  console.log('combinedData homepage', combinedData);

  
  

  return (
    <>
      <Banner combinedData={combinedData}/> 
      <PublishersTable combinedData={combinedData}/>
    </>
  );
};

export default Homepage;