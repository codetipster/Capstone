import React from "react";
import { useEffect, useState, useContext } from "react";
import Banner from "../components/Banner/Banner";
import PublishersTable from "../components/PublishersTable";
import DataContext from '../contexts/DataContext';
import { calculateAverageRates, calculateAverageDifferenceOfTwoDays, calculateTodayAverages } from '../utils';



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