import React from "react";
import { Chart } from "react-google-charts";

export const data1 = [
    [
      "Day",
      "300x75",
      "300x90",
      "320x50",
      "320x100",
      "320x150",
      "320x75", 
    ],
    [1, 37.8, 80.8, 41.8, 55.6, 75.1, 65.1],
    [2, 30.9, 69.5, 32.4, 50.4, 70.1, 62.1],
    [3, 25.4, 57, 25.7, 45.2, 65.1, 60.1],
    [4, 11.7, 18.8, 10.5, 35.9, 60.1, 58.1],
    [5, 11.9, 17.6, 10.4, 30.3, 55.1, 55.1],
    [6, 8.8, 13.6, 7.7, 25.2, 50.1, 53.1],
    [7, 7.6, 12.3, 9.6, 20.8, 45.1, 51.1],
    [8, 12.3, 29.2, 10.6, 22.6, 40.1, 49.1],
    [9, 16.9, 42.9, 14.8, 24.5, 35.1, 47.1],
    [10, 12.8, 30.9, 11.6, 26.3, 30.1, 45.1],
    [11, 5.3, 7.9, 4.7, 18.2, 25.1, 43.1],
    [12, 6.6, 8.4, 5.2, 15.9, 20.1, 41.1],
    [13, 4.8, 6.3, 3.6, 11.3, 15.1, 39.1],
    [14, 4.2, 6.2, 3.4, 8.4, 10.1, 37.1],
  ];
  

export default function Linechart({ data, selectedAdSlot }) {
  console.log('data from publisherID from Linechart', data);
  console.log('selectedAdSlot from Linechart', selectedAdSlot);

  // Define options inside the component to access selectedAdSlot
  const options = {
    chart: {
      title: `${selectedAdSlot} Viewability by Size (Last 30 Days)`,
      subtitle: "Size Overview",
    },
  };

  return (
    <Chart
      chartType="Line"
      width="95%"
      height="450px"
      data={data1} // You might want to use 'data' instead of 'data1' if it's meant to be dynamic
      options={options}
    />
  );
}