export function calculateAverageRates(data) {
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

  
  export function calculateDailyAverage(adslots) {
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
  

  export function calculateAverageDifferenceOfTwoDays(data) {
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
  

  export function calculateTodayAverages(data) {
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